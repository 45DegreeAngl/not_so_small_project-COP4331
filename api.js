const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
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

let tempUsers = [];

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

    tempUsers.push(newUser);

    const secret = process.env.JWT_SECRET + hashedPassword;
    const token = jwt.sign({email: newUser.email}, secret, {expiresIn: "5m",} );

    let link = `https://ganttify-5b581a9c8167.herokuapp.com/verify-email/${email}/${token}`;


    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailDetails = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Verify Your Ganttify Account',
      text: `Hello ${newUser.name},\n Please verify your Ganttify account by clicking the following link: ${link}`,
      html: `<p>Hello ${newUser.name},</p> <p>Please verify your Ganttify account by clicking the following link:\n</p> <a href="${link}" className="btn">Verify Account</a>`
    };


    transporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return res.status(500).json({ error: 'Error sending verification email' });
      } else {
        return res.status(200).json({ message: 'Verification email sent' });
      }
    });
  } catch (error) {
    console.error('An error has occurred:', error);
    return res.status(500).json({ error });
  }


  res.status(201).json({ error: "" });
  
});


router.post('/verify-email', async (req, res) => {
  const { email, token } = req.body;


  try {

    let user = tempUsers.find(userEmail => userEmail.email === email);
    if (!user) {
      return res.status(404).send("User was not found");
    }

 
    const secret = process.env.JWT_SECRET + user.password;
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(403).send("Invalid or expired token");
    }

  
  
    const db = client.db("ganttify");
    const userCollection = db.collection("userAccounts");
    const userCheck = await userCollection.findOne({ email });
    if (userCheck) {
      res.status(200).json({ message: "User already exists" });
      return;
    }
    await userCollection.insertOne(user);

    userList.push(user);



    let index = tempUsers.indexOf(user);
    if (index > -1) {
      tempUsers.splice(index, 1);
    }


    return res.status(200).json({ message: "Email verified and account created successfully" });
    

  } catch (error) {
    res.status(403).json({ error: "Server error occurred" });
  }
});


router.get('/verify-email/:email/:token', async (req, res) => { 

  const { email, token } = req.params;


  try {

    let user = tempUsers.find(
      userEmail => userEmail.email === email
    )


    if (user) {
      const secret = process.env.JWT_SECRET + user.password;
  
      try {

        jwt.verify(token, secret);
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

  
      } catch (error) {
        res.send("Invalid or expired token");
      }
    } 
  
    else{
      return res.status(404).send("User does not exist");
    }
  } catch(error) {
    console.error('Error during verification:', error);
    res.status(400).send("Invalid ID format");
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
          _id: user._id,
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


// -----------------> Assign user to a task <----------------- //
router.post("/assignusertotask", async (req, res) => {
  const { taskId, userId } = req.body;

  if (!taskId || !userId) {
    return res.status(400).json({ error: "Task ID and user ID are required" });
  }

  try {
    const db = client.db("ganttify");
    const taskCollection = db.collection("tasks");

    //Check if the user is already assigned to the task
    const task = await taskCollection.findOne({
      _id: new ObjectId(taskId),
      assignedTasksUsers: new ObjectId(userId)
    });

    if (task) {
      return res.status(400).json({error: "User is already assigned to this task"});
    }

    // Update task to add user to assignedTasksUsers 
    const result = await taskCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $addToSet: { assignedTasksUsers: new ObjectId(userId) } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "User assigned to task successfully" });
  } catch (error) {
    console.error("Error assigning user to task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// -----------------> Assign task to a project <----------------- //
router.post("/assigntaskstoproject", async (req, res) => {
  const { projectId, taskId } = req.body;
  let error = "";

  if (!projectId || !taskId || !Array.isArray(taskId) || taskId.length === 0) {
    error = "Project ID and an array of Task IDs are required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");
    const taskCollection = db.collection("tasks");

    // Ensure the project exists
    const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Ensure all tasks exist
    const tasks = await taskCollection.find({
      _id: { $in: taskId.map(id => new ObjectId(id)) }
    }).toArray();

    if (tasks.length !== taskId.length) {
      return res.status(404).json({ error: "One or more tasks not found" });
    }

    // Check if any of the tasks are already assigned to the project
    const assignedTasks = await taskCollection.find({
      _id: { $in: taskId.map(id => new ObjectId(id)) },
      tiedProjectId: new ObjectId(projectId)
    }).toArray();

    if (assignedTasks.length > 0) {
      const alreadyAssignedTasks = assignedTasks.map(task => task._id.toString());
      return res.status(400).json({ error: `Task is already assigned to this project` });
    }

    // Add taskId to the project's tasks array
    await projectCollection.updateOne(
      { _id: new ObjectId(projectId) },
      { $addToSet: { tasks: { $each: taskId.map(id => new ObjectId(id)) } } }
    );

    // Update each task's tiedProjectId field
    await taskCollection.updateMany(
      { _id: { $in: taskId.map(id => new ObjectId(id)) } },
      { $set: { tiedProjectId: new ObjectId(projectId) } }
    );

    res.status(200).json({ message: "Tasks assigned to project successfully" });
  } catch (error) {
    console.error("Error assigning tasks to project:", error);
    res.status(500).json({ error: "Internal server error" });
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

  if (!nameProject || !founderId) {
    error = "Project name is required";
    return res.status(400).json({ error });
  }

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const newProject = {
      nameProject,
      dateCreated: new Date(),
      team: new ObjectId(),
      tasks: null,
      isVisible,
      founderId: new ObjectId(founderId),
      flagDeletion,
      group: [new ObjectId()],
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


//-----------------> Read public projects only <-----------------//
router.get("/publicprojects", async (req, res) => {
  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const publicProjects = await projectCollection.find({ isVisible: 1 }).toArray();

    res.status(200).json(publicProjects);
  } catch (error) {
    console.error("Error fetching public projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// -----------------> Read specific projects <-----------------//
router.post("/readspecificprojects", async (req, res) => {
  const { projectId } = req.body; // Assuming projectIds is an array of _id values

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const projects = await projectCollection.find({
      _id: { $in: projectId.map(id => new ObjectId(id)) }
    }).toArray();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error finding projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//-----------------> Read all projects for a specific user (public & founder) <-----------------//
router.get("/userprojects/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const accessibleProjects = await projectCollection.find({
      $or: [
        { isVisible: 1 },
        { founderId: new ObjectId(userId) }
      ]
    }).toArray();

    res.status(200).json(accessibleProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Internal server error" });
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

router.post('/forgot-password', async (req, res) => 
{
  const {email} = req.body;
  let error = '';
  

  try{

    const db = client.db('ganttify');
    const results = db.collection('userAccounts');
    const user = await results.findOne({email});


    if (user) {
      
      const secret = process.env.JWT_SECRET + user.password;
      const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: "2m",} );

      //let link = `https://ganttify-5b581a9c8167.herokuapp.com/reset-password/${user._id}/${token}`;
      let link = `http://localhost:3000/reset-password/${user._id}/${token}`;

      

      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      let mailDetails = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Reset Your Ganttify Password',
        text: `Hello ${user.name},\n We recieved a request to reset your Ganttify password. Click the link to reset your password: ${link}`,
        html: `<p>Hello ${user.name},</p> <p>We recieved a request to reset your Ganttify password. Click the button to reset your password:\n</p> <a href="${link}" className="btn">Reset Password</a>`
      };


      transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          return res.status(500).json({ error: 'Error sending email' });
        } else {
          return res.status(200).json({ message: 'Password reset email sent' });
        }
      });
    } else {
      return res.status(404).json({ error: 'User with that email address does not exist.' });
    }


  } catch (error) {
    console.error('An error has occurred:', error);
    return res.status(500).json({ error });
  } 
});
  
router.get('/reset-password/:id/:token', async (req, res) => 
{

  const { id, token } = req.params;

  try {

    const objectId = new ObjectId(id);
  
    const db = client.db('ganttify');
    const results = db.collection('userAccounts');
    const user = await results.findOne({_id: objectId});


    if (user) {
      const secret = process.env.JWT_SECRET + user.password;
  
      try {

        jwt.verify(token, secret);
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  
      } catch (error) {
        res.send("Not verified");
      }
    } 
  
    else{
      return res.status(404).send("User does not exist");
    }
  } catch(error) {
    console.error('Error during password reset verification:', error);
    res.status(400).send("Invalid ID format");
  }

});
  
router.post('/reset-password', async (req, res) => 
{
  const { id, password } = req.body;

  let error = '';

  try {
    const db = client.db('ganttify');
    const objectId = ObjectId.createFromHexString(id); 
    const userCollection = db.collection('userAccounts');
    const user = await userCollection.findOne({_id: objectId});


    if (user){
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        await userCollection.updateOne({_id: objectId}, {$set: {password: hashedPassword}});
        res.status(200).json({ message: "Password has been reset successfully" });
      } catch(error) {
        return res.json({status: "error", data: error})
      }

    } else {
      error = 'User not found';
      return res.status(400).json({ error });
    }

  } catch (error) {
    console.error('Error occured during password reset:', error);
    error = 'Internal server error';
    res.status(500).json({ error });
  } 
});

//////////////////////
// SEARCH ENDPOINTS //
//////////////////////

//-> Search Project by Title & Sort by Due Date <-//
router.post("/search/projects", async (req, res) => {
    //need to also add functionality for teamId, we'll get there
  const { founderId,title, sortBy = "dueDate" } = req.body;

  try {
    const db = client.db("ganttify");
    const projectCollection = db.collection("projects");

    const query = { founderId:new ObjectId(founderId), nameProject: { $regex: title, $options: "i" } };
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
    //need to also add functionality for teamId, we'll get there
  const {founderId, name, dueDate, sortBy = "completionPercentage" } = req.body;
  const query = {};

  if (!dueDate) {
    query.description = { founderId:founderId,$regex: name, $options: "i" };
  }
  
  else {
    query.description = { founderId: founderId, $gte: new Date(dueDate) };
  }
  console.log(query);

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
//-> Search Tasks for Specific User  <-//
router.post("/search/tasks/todo", async (req, res) => {
    const { userId } = req.body;
  
    try {
      const db = client.db("ganttify");
      const taskCollection = db.collection("tasks");
  
      const query = {
        assignedTasksUsers: new ObjectId(userId),
      };
  
      const tasks = await taskCollection.find(query).toArray();
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error searching tasks for user on project team:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
