// Until now, we’ve been storing data in memory
// This is bad for a few reasons -
// 1. Data can’t be dynamic, if you update in memory
// objects, the updates are lost if the process
// restarts
// 2. There are multiple servers in the real world

// In the real world, a basic architecture looks like this
// Browser Backend Database
// User hits the backend
// Backend hits the database
// User doesn’t have access to the database/can’t talk to the DB

// In the real world, a basic architecture looks like this
// There are various types of databases
// 1. Graph DBs
// 2. Vector DBs
// 3. SQL DBs
// 4. NoSql DBs
// For todays class, we’ll look at a famous NoSQL database - MongoDb

// MongoDB lets you create databases
// In each DB, it lets you create tables (collections)
// In each table, it lets you dump JSON data
// It is schemaless
// It scales well and is a decent choice for most use cases

// How to start?
// 1. Create a MongoDB free instance by going to https://mongodb.com/
// 2. Get your mongoldb connection URL
// 3. Download MongoDB Compass and try to explore the DB

// How does the backend connect to the database?
// Using libraries!
// 1. Express lets u create an HTTP server
// 2. Jsonwebtokens library lets you create jets
// 3. Mongoose lets you connect to your database

// Lets explore mongoose and do the next assignment
// https://mongoosejs.com/
// https://gist.github.com/hkirat/23c42247d8a37de53b005d2668507a67

//Model - A model is a blueprint for the documents (records) in a collection. In below example, "users" is the model representating the "User" collection but when we define a Mongoose model with a name (e.g. "User" in our case), Mongoose automatically pluralizes the model name and onverts it to lowercase to create the collection name.

//Collection - In MongoDB, a collection is similar to a table in SQL database. It stores multiple documents

//Document - A document in MongoDB is a single record in a collection, represented as a javascript object. In our case, each user(document) has a name, email and password.

//A payload refers to the actual data being transferred or sent over a network or between systems

//When we are working with APIs (like when using fetch() or axios() in javascript, the payload is the data that you send along wth the request)

//for example, when you log into a website, you send a payload to the server, which contains your username and password {"username":"rajan","password":"1234"} this JSON object, is the payload being sent to the server. It contains the actual data that the server needs to process the request

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPassword = "1234567";
const zod = require("zod");

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/user_database"); //user_database is our database name here

const users = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});
//const users is the model Represent the "User" collection in the users_database but mongoose will automatically pluralize the Model name from "User" to "users" and use the "users" as the collection name.

app.post("/signup", async (req, res) => {
  const user_name = req.body.username;
  const user_email = req.body.email;
  const user_password = req.body.password;

  let existingUser = await users.findOne({ email: user_email });
  if (existingUser) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }
  const schema = zod.object({
    name: zod.string().min(5),
    email: zod.string().email(),
    password: zod.string().min(7),
  });

  const response = schema.safeParse({
    name: user_name,
    email: user_email,
    password: user_password,
  });

  if (!response.success) {
    return res.json({
      msg: "Invalid user credentials to create",
    });
  } else {
    const user = new users({
      name: user_name,
      email: user_email,
      password: user_password,
    });
    //This creates a new instance of the users model with the name, password and email properties set to the values provided.

    user.save().then(() => console.log("User added to database"));
    //This saves the user document into the 'users' collection in our database.

    const token = jwt.sign({ token_user_name: user_name }, jwtPassword);
    res.json({
      token,
    });
  }
});

app.get("/signed", async (req, res) => {
  const token = req.headers.token;

  try {
    const decodeToken = jwt.verify(token, jwtPassword);
    console.log(decodeToken);
    const username = decodeToken.token_user_name;
    console.log(username);
    const user_data = await users.find();
    res.json({
      users: user_data.filter((e) => {
        if (e.name == username) {
          return false;
        } else {
          return true;
        }
      }),
    });
  } catch {
    res.json({
      msg: "Invalid token",
    });
  }
});

app.get((err, req, res, next) => {
  res.json({
    msg: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
