
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
//const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

const app_name = 'ganttify-5b581a9c8167';

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

///////////////////////////////////////////////////
// For Heroku deployment
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));


}

////////////////////ADDED////////////////////////

// In-memory array to store users
let userList = [];


app.post('/api/register', async (req, res) => {
  const { email, name, phone, password, username } = req.body;
  let error = '';

  if (!email || !name || !phone || !password || !username) {
    error = 'All fields are required';
    return res.status(400).json({ error });
  }

  try {
    await client.connect();
    const db = client.db('ganttify');
    const userCollection = db.collection('userAccounts');

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      error = 'Email already used';
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
      toDoList: []
    };

    userList.push(newUser);

    await userCollection.insertOne(newUser);

    res.status(201).json({ error: '' });
  } catch (error) {
    console.error('Registration error:', error);
    error = 'Internal server error';
    res.status(500).json({ error });
  } finally {
    await client.close();
  }
});


app.get('/api/userlist', (req, res) => {
  res.status(200).json({ users: userList });
});


app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      let error = '';

      if (!email || !password) {
        error = 'Email and password are required';
        return res.status(400).json({ error });
      }

  try {
      await client.connect();
      const db = client.db('ganttify');
      const results = db.collection('userAccounts');

      //Find user by email
      const user = await results.findOne({email});

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
            error: ''
          });
        } else {
          error = 'User/Password combination incorrect';
          res.status(401).json({ error });
        }
      } else {
        error = 'User/Password combination incorrect';
        res.status(401).json({ error });
      }
  } catch (error) {
      console.error('Login error:', error);
      error = 'Internal server error';
      res.status(500).json({ error });
  } finally {
  await client.close();
  }
});

//////////////////////////ADDED/////////////////////////////








app.post('/api/forgot-password', async (req, res) => 
{
  const {email} = req.body;
  let error = '';
  

  try{

    await client.connect();
    const db = client.db('ganttify');
    const results = db.collection('userAccounts');
    

    const user = await results.findOne({email});


    if (user) {
      
      const secret = process.env.JWT_SECRET + user.password;
      const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: "100m",} );



      //-------------------------------------------------------------------------------------------------------------------

      const link = `https://ganttify-5b581a9c8167.herokuapp.com/reset-password/${user._id}/${token}`;
      
      //let link = `http://localhost:5000/reset-password/${user._id}/${token}`;
      //-------------------------------------------------------------------------------------------------------------------



      error = `${link}`;

      res.status(404).json({ error });

      console.log(error);


    } else {
      error = 'User with that email address does not exist.';
      console.log("User not found");
      //return res.json({ status: "User does not exit!"});
    }


  } catch (error) {
    res.status(404).json({ error });
    console.log("Try/catch not working");
  } finally {
    await client.close();
  }
});

app.get('/reset-password/:id/:token', async (req, res) => 
{
  const { id, token } = req.params;
  console.log(req.params);
  console.log(`\n${id}`);

  try {

    const objectId = new ObjectId(id);
  
    await client.connect();
    const db = client.db('ganttify');
    const results = db.collection('userAccounts');
    const user = await results.findOne({_id: new ObjectId(id)});


    if (user) {
      const secret = process.env.JWT_SECRET + user.password;
  
  
      try {

        const verify = jwt.verify(token, secret);
        //res.send("Verified");
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
        console.log("Did it work?");
  
      } catch (error) {
        res.send("Not verified");
        // res.status(401).send("Not verified");
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


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

