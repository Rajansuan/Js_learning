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

const express = require('express');
const app = express();

//Get request - http://localhost:3000/health-checkup?kidneyid=1
//Send in Headers - username and password

app.get("/health-checkup", (req,res)=>{
    const userName = req.headers.username;
    const passWord = req.headers.password;
    const kidneyId = req.query.kidneyid;

    if(kidneyId==1 || kidneyId==2){
        if(userName=="admin" && passWord=="pass123"){
            res.json({
                msg:"Your kidney is fine!"
            })
        }else{
            res.status(400).json({
                msg:"Wrong username and password"
            })
        }
    }else{
        res.status(400).json({
            msg:"Wrong input"
        })
    }
})

app.listen(3000);



