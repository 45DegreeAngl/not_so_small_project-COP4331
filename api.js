const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Replaced app.post with router.post for modularity and best practices.
const router = express.Router();
const url = process.env.MONGODB_URI;

let client;
(async () => {
  try {
    client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// In-memory array to store users
let userList = [];

//-----------------> Register Endpoint <-----------------//
router.post("/register", async (req, res) => {
  const { email, name, phone, password, username } = req.body;
  let error = "";

  if (!email || !name || !phone || !password || !username) {
    error = "All fields are required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const userCollection = db.collection("userAccounts");

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      error = "Email already used";
      return res.status(400).json({ error });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      name,
      phone,
      password: hashedPassword,
      username,
      accountCreated: new Date(),
      projects: [],
      toDoList: [],
    };

    userList.push(newUser);

    await userCollection.insertOne(newUser);

    res.status(201).json({ error: "" });
  } catch (error) {
    console.error("Registration error:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> User List Endpoint <-----------------//
router.get("/userlist", (req, res) => {
  res.status(200).json({ users: userList });
});

//-----------------> Login Endpoint <-----------------//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let error = "";

  if (!email || !password) {
    error = "Email and password are required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const results = db.collection("userAccounts");

    // Find user by email
    const user = await results.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).json({
          email: user.email,
          name: user.name,
          username: user.username,
          phone: user.phone,
          projects: user.projects,
          toDoList: user.toDoList,
          error: "",
        });
      } else {
        error = "User/Password combination incorrect";
        res.status(401).json({ error });
      }
    } else {
      error = "User/Password combination incorrect";
      res.status(401).json({ error });
    }
  } catch (error) {
    console.error("Login error:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

// TASK CRUD Operations
//-----------------> Create Task Endpoint <-----------------//
router.post("/createtask", async (req, res) => {
  const {
    description,
    dueDateTime,
    progress,
    assignedTasksUsers,
    taskTitle,
    tiedProjectId,
    taskCreatorId,
  } = req.body;
  let error = "";

  if (
    !description ||
    !dueDateTime ||
    !progress ||
    !taskTitle ||
    !taskCreatorId
  ) {
    error =
      "Task description, dueDateTime, progress, taskTitle, taskCreatorId are required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    const newTask = {
      description,
      dueDateTime: new Date(dueDateTime),
      taskCreated: new Date(),
      progress,
      assignedTasksUsers: assignedTasksUsers.map((id) => new ObjectId(id)),
      taskTitle,
      tiedProjectId: new ObjectId(tiedProjectId),
      taskCreatorId: new ObjectId(taskCreatorId),
    };

    const task = await taskCollection.insertOne(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Read Task <-----------------//
router.get("/readtasks", async (req, res) => {
  let error = "";

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    const tasks = await taskCollection.find({}).toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error finding tasks:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Update Task <-----------------//
router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  let error = "";

  if (!Object.keys(updateFields).length) {
    error = "No fields provided to update";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    // Convert any provided ObjectId fields
    if (updateFields.assignedTasksUsers) {
      updateFields.assignedTasksUsers = updateFields.assignedTasksUsers.map(
        (id) => new ObjectId(id),
      );
    }
    if (updateFields.tiedProjectId) {
      updateFields.tiedProjectId = new ObjectId(updateFields.tiedProjectId);
    }
    if (updateFields.taskCreatorId) {
      updateFields.taskCreatorId = new ObjectId(updateFields.taskCreatorId);
    }
    if (updateFields.dueDateTime) {
      updateFields.dueDateTime = new Date(updateFields.dueDateTime);
    }

    const result = await taskCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating task:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Delete Task <-----------------//
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  let error = "";

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting task:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

// Project CRUD Operations
//-----------------> Create a project <-----------------//
router.post("/createproject", async (req, res) => {
  const {
    nameProject,
    team,
    tasks,
    isVisible = 1,
    founderId,
    flagDeletion = 0,
    group,
  } = req.body;
  let error = "";

  if (!nameProject || !team || !founderId || !group) {
    error = "Project name, team, founder ID, and group are required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const newProject = {
      nameProject,
      dateCreated: new Date(),
      team: new ObjectId(team),
      tasks: tasks.map((id) => new ObjectId(id)),
      isVisible,
      founderId: new ObjectId(founderId),
      flagDeletion,
      group: new ObjectId(group),
    };

    const project = await projectCollection.insertOne(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Read all projects <-----------------//
router.get("/readprojects", async (req, res) => {
  let error = "";

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const projects = await projectCollection.find({}).toArray();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error finding projects:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Update Project <-----------------//
router.put("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  let error = "";

  if (!Object.keys(updateFields).length) {
    error = "No fields provided to update";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    // Convert any provided ObjectId fields
    if (updateFields.team) {
      updateFields.team = new ObjectId(updateFields.team);
    }
    if (updateFields.tasks) {
      updateFields.tasks = updateFields.tasks.map((id) => new ObjectId(id));
    }
    if (updateFields.founderId) {
      updateFields.founderId = new ObjectId(updateFields.founderId);
    }
    if (updateFields.group) {
      updateFields.group = new ObjectId(updateFields.group);
    }

    const result = await projectCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating project:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

//-----------------> Delete a project <-----------------//
router.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  let error = "";

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");
    const recentlyDeletedCollection = db.collection(
      "recently_deleted_projects",
    );

    // Find the project to delete
    const project = await projectCollection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      error = "Project not found";
      return res.status(404).json({ error });
    }

    // Insert the project into recently deleted collection
    await recentlyDeletedCollection.insertOne(project);

    // Delete the project from main collection
    const result = await projectCollection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting project:", error);
    error = "Internal server error";
    res.status(500).json({ error });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  let error = "";

  try {
    const db = client.db("ganttify");
    const results = db.collection("userAccounts");

    const user = await results.findOne({ email });

    if (user) {
      const secret = process.env.JWT_SECRET + user.password;
      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "100m",
      });

      const link = `https://ganttify-5b581a9c8167.herokuapp.com/reset-password/${user._id}/${token}`;
      error = `${link}`;

      res.status(404).json({ error });
      console.log(error);
    } else {
      error = "User with that email address does not exist.";
      console.log("User not found");
    }
  } catch (error) {
    res.status(404).json({ error });
    console.log("Try/catch not working");
  }
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  console.log(`\n${id}`);

  try {
    const objectId = new ObjectId(id);

    const db = client.db("ganttify");
    const results = db.collection("userAccounts");
    const user = await results.findOne({ _id: new ObjectId(id) });

    if (user) {
      const secret = process.env.JWT_SECRET + user.password;

      try {
        const verify = jwt.verify(token, secret);
        res.sendFile(
          path.resolve(__dirname, "frontend", "build", "index.html"),
        );
        console.log("Did it work?");
      } catch (error) {
        res.send("Not verified");
      }
    } else {
      return res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.error("Error during password reset verification:", error);
    res.status(400).send("Invalid ID format");
  }
});

//////////////////////
// SEARCH ENDPOINTS //
//////////////////////

//-> Search Project by Title & Sort by Due Date <-//
router.post("/search/projects", async (req, res) => {
  const { title, sortBy = "dueDate" } = req.body;

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const query = { nameProject: { $regex: title, $options: "i" } };
    const sortOptions = { [sortBy]: 1 }; // 1 for ascending, -1 for descending

    const projects = await projectCollection
      .find(query)
      .sort(sortOptions)
      .toArray();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//-> Search Categories by Title and Sort by Completion Percentage <-//
router.post("/search/categories", async (req, res) => {
  const { title, sortBy = "completionPercentage" } = req.body;

  try {
    const db = client.db("ganttify");
    const categoryCollection = db.collection("categories");

    const query = { title: { $regex: title, $options: "i" } };
    const sortOptions = { [sortBy]: 1 }; // 1 for ascending, -1 for descending

    const categories = await categoryCollection
      .find(query)
      .sort(sortOptions)
      .toArray();

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error searching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Task by Name, Due Date, (Sort by Completion Percentage)
router.post("/search/tasks", async (req, res) => {
  const { name, dueDate, sortBy = "completionPercentage" } = req.body;
  const query = {};

  if (name) {
    query.description = { $regex: name, $options: "i" };
  }
  if (dueDate) {
    query.dueDateTime = { $gte: new Date(dueDate) };
  }

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    const sortOptions = { [sortBy]: 1 }; // 1 for ascending, -1 for descending

    const tasks = await taskCollection.find(query).sort(sortOptions).toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//-> Search Task for Specific User on Project Team <-//
router.post("/search/tasks/users", async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    const query = {
      tiedProjectId: ObjectId(projectId),
      assignedTasksUsers: ObjectId(userId),
    };

    const tasks = await taskCollection.find(query).toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error searching tasks for user on project team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;