// Middlewares, authentication, global catches, zod

// Before you reach the doctor
// 1. Your adhar/insurance info is taken
// 2. Blood test is done
// 3. BP is checked

// Now questions arises - 
// How do you do
// 1. Auth checks? (Does this user have funds to visit the doctor)
// 2. Ensure input by the user is valid (BP / blood tests)

// Two primary pre-checks done by any website -
// 1. authentication
// 2. Input Validation
// Answer - This job is done by Middlewares

// Middleware is software that connects applications, tools, and databases together to allow them to communicate and share data. It's often called "software glue" because it binds different systems together

// What is a middleware in js?
// In JavaScript, particularly in the context of web frameworks like Express.js, a middleware is a function that sits between the request and the response, allowing you to modify the request or response objects, execute code, or end the request-response cycle.

// Middleware functions have access to the request object (req), the response object (res), and the next() function in the application's request-response cycle. They can perform tasks such as logging, authentication, data parsing, or error handling.

// Key Features of Middleware:
// Execute code.
// Modify the request and response objects.
// End the request-response cycle.
// Call the next middleware in the stack using next().

//  JavaScript, a request-response cycle refers to the process of sending a request from a client (such as a web browser) to a server, the server processing that request, and then sending back a response to the client. This is the core of how web applications communicate.

// Example: Fetching data from a server using fetch()
// Here’s a simple example that illustrates the request-response cycle:

// The client (browser) sends a request to a server (e.g., asking for user data).
// The server processes the request and sends back a response (e.g., user data in JSON format).
// The client receives the response and processes it (e.g., displaying the user data on a web page).

//Logic building
//Before we proceed, lets add constraints to our route
// 1. User needs to send a kidneyId as a query param which should be a number from 1-2 (humans only has 2 kidneys)
// 2. User should send a username and password in headers

// Ctrl + ` => Open terminal in vs code
// Alt + Z => Word wrap in vs code

// const express = require('express');
// const app = express();

// //Get request - http://localhost:3000/health-checkup?kidneyid=1
// //Send in Headers - username and password

// app.get("/health-checkup", (req,res)=>{
//     const userName = req.headers.username;
//     const passWord = req.headers.password;
//     const kidneyId = req.query.kidneyid;

//     //Dumb ways of doing input validation and authentication
//     if(kidneyId==1 || kidneyId==2){
//         if(userName=="admin" && passWord=="pass123"){
//             res.json({
//                 msg:"Your kidney is fine!"
//             })
//         }else{
//             res.status(400).json({
//                 msg:"Wrong username and password"
//             })
//         }
//     }else{
//         res.status(400).json({
//             msg:"Wrong input"
//         })
//     }
// })

// app.listen(3000);


// What if I tell you to introduce another route that does
// Kidney replacement
// Inputs need to be the same then code repition will be there
// Ugly solution - Create a new route, repeat code
// Slightly better solution - Create wrapper fns
// Best solution - middleware

//Adding the Middleware (just another func)
//You can add multiple callback functions in get syntax
//Also the get syntax have the next after req,res -> and calls it when the things are fine and it itself a function
//next() - calling next function makes control reaches to the next function
//for example - 

//const express = require('express');
// const app = express();
// const port = 3000;

// app.get("/",(req,res,next)=>{
//   console.log("Hello World from fn1");
//   next();
// }, (req,res)=>{
//   console.log("Hello World from fn2");
// })

// app.listen(port);
//=================================

const express = require('express');
const app = express();
const port = 3000;

//Get request - http://localhost:3000/health-checkup?kidneyid=1
//Send in Headers - username and password


const middlewareCredential = (req,res,next)=>{
  const userName = req.headers.username;
  const passWord = req.headers.password;
  if(userName === 'admin' && passWord === 'pass@123'){
    next();
  }
  else{
    res.status(400).json({
      msg: "Username and password does not match"
    })
  }
}

const middlewareKidneyCheck = (req,res,next)=>{
  const kidneyNumber = req.query.kidneynumber;
  if(kidneyNumber == 1 || kidneyNumber == 2){
    next();
  }
  else{
    res.status(400).json({
      msg: "Incorrect kidney input"
    })
  }
}

app.get("/", middlewareCredential, middlewareKidneyCheck, (req, res)=>{
  res.json({
    msg : "Your kidney is fine"
  })
})

app.listen(port);