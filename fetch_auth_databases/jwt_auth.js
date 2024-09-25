// As we can tell by now, anyone can send requests to our backend
// They can just go to postman and send a request
// How do we ensure that this user has access to a certain resource?

//Dumb way - Ask user to send username and password in all requests as headers

// Slightly better way -
// 1. Give the user back a token on signup/signin
// 2. Ask the user to send back the token in all future requests
// 3. When the user logs out, ask the user to forget the token (or revoke it from the backend)

//Why we store the token in local storage not the email and password, because local storage is very public

//app.use(express.json()) -> this middleware to get the body

//Fetch - how can you send http request from real website

//The fetch API - sedning request through UI
//Browser exposed the function named fetch which lets you fetch data from the backend and it is not the part of javascript

//example - Lets say I ask you create an HTML page where
// 1. You can see the names of 10 people
// 2. You need to make sure you get these data from an API call

//html code you need to write --> http server (GET requset - api call)

// Project for today -
// Let people sign up to your website
// Only allow signed in users to see people (create a dummy people list)

// Almost all websites have auth
// There are complicated ways
// (Login with google…) to do auth
// Easiest is a username password based auth

//Before we get into authentication
//Lets understand some cryptography jargon

// 1. Hashing
// 2. Encryption
// 3. Json web tokens
// 4. Local storage

//Simple language explaination - 
// 1. Hashing
// Definition: Hashing is a process of converting data (like a password or file) into a fixed-length string of characters, which is typically a hexadecimal number. The output (called a hash) is unique for every input, and even a small change in the input data will result in a completely different hash.
// Key Points:
// Hashing is one-way: Once data is hashed, it can't be reversed back to the original form.
// Commonly used for storing passwords securely.
// Example: Let’s say you have a password "mypassword". Using a hashing algorithm like SHA-256, it might be converted to something like:
// SHA-256 Hash: 34819d7beeabb9260a5c854bc85b3e44a22222a1dbab23a7285544ad47eebdb1
// If someone steals this hash, they can't easily reverse it to find out the original password.
// Real-world Usage: Hashing is used in password storage, file integrity checks, and blockchain.

// 2. Encryption
// Definition: Encryption is the process of converting data into a secret code to prevent unauthorized access. Unlike hashing, encryption is two-way, meaning you can encrypt data and later decrypt it to get the original data back.
// Key Points:
// Encryption uses a key to convert plaintext into ciphertext (the encrypted version).
// Decryption is the reverse process, where you convert the ciphertext back to plaintext using the same key (or a different key in some cases, like asymmetric encryption).
// Example: Suppose you send the message "hello". Using an encryption algorithm and a key, it might be encrypted as:
// Encrypted: 5d41402abc4b2a76b9719d911017c592
// Only the person with the correct key can decrypt the message back to "hello".
// Real-world Usage: Encryption is used in secure messaging apps (like WhatsApp), HTTPS (for secure browsing), and file protection.

// 3. JSON Web Tokens (JWT)
// Definition: A JWT is a compact, URL-safe token used for securely transmitting information between two parties (usually a server and a client). JWTs are commonly used for authentication and authorization.
// Key Points:
// A JWT is composed of three parts: Header, Payload, and Signature.
// It’s usually encoded and signed, but not encrypted, meaning anyone who gets the token can see its contents, but they can’t modify it without invalidating the signature.
// Example: Let’s say you log into a website. After successful login, the server sends you a JWT that looks like:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5laWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
// This JWT contains the user's information (like name: "Neil") and can be used to verify the user’s identity on subsequent requests.
// Real-world Usage: JWTs are used in modern web applications for session management, API authentication (OAuth), and token-based authentication.

// 4. Local Storage
// Definition: Local Storage is a feature in web browsers that allows websites to store data on a user's browser. Unlike cookies, data in local storage is stored indefinitely (until the user clears it manually), and it's only accessible via JavaScript running on the same website.
// Key Points:
// It stores data as key-value pairs.
// Data persists even after the browser is closed and reopened.
// Example: Suppose a website stores a JWT token in the local storage after you log in:
// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIs...');
// Later, when you visit the website again, it can check if the token exists in local storage:

// const token = localStorage.getItem('token');
// if (token) {
//   // User is already logged in
// }
// Real-world Usage: Local Storage is commonly used to store tokens (like JWTs), user preferences, or small amounts of data on the client side.

//--------------------

//1. Hashing
//Why we hash password before storing in the database
//Reason - Privacy and protection from breach
//It is a one way - can not retrieve back the original string

//2. Encryption - Two way but needs the key to decrypt it

//3. JSON Web Tokens (JWT)
//JSON here means- it only works for JSON inputs
//Different from hashing and encrytion
//Token here means - it takes the string and creates the token
//weird part is from the output token anyone can see the inputs
//It is just converting the complex object into the long string
//JWT.io - to see the content of token Bearer
// Now why we need
// Why Do We Need JWT?
// Stateless Authentication:

// Traditionally, when a user logs into an application, the server creates a session for the user and stores session data (like user information) on the server. This is called stateful authentication because the server needs to maintain the session state.
// JWT is stateless. Instead of storing session data on the server, all the necessary information (user details, permissions, etc.) is stored in the JWT, which is sent to the client. The client sends this JWT with every request, and the server can verify the token without storing any session data. This reduces server memory usage and simplifies scaling.

// Advantages of Using JWT:
// - Scalability:
// Since JWT is stateless, the server does not need to store user sessions, making it highly scalable for large applications.
// - Efficiency:
// You don’t need to query the database for every request to check the user's session. Just verify the JWT.
// - Security:
// JWT can be signed and optionally encrypted to ensure data integrity and confidentiality.
// - Cross-Domain Authentication:
// JWT tokens work well in SSO and can be used across different applications and domains.
// Real-World Use Cases of JWT:
// 1. Single Sign-On (SSO):
// JWT is commonly used for SSO, where a user logs in once, and the same token can be used to authenticate across multiple applications or services, even in different domains (like Google or Facebook's login systems).
// 2. API Security:
// When building APIs (especially RESTful APIs), JWT is widely used for securing endpoints. Clients (like web apps or mobile apps) can send JWTs with every request to access restricted resources.

//jwt.decode simply reads the token and shows you the information inside without verifying if the token is trustworthy.
//jwt.verify does everything decode does, but it also verifies that the token is authentic and hasn't been tampered with. It checks the signature using a secret key (or public/private key pair).

// why we need jwt.verify even though jwt.decode can read the token, and why verification is crucial in practical terms.

// 1. The Structure of a JWT:
// A JWT is made up of three parts:

// Header: Contains metadata about the token, like the signing algorithm used.
// Payload: Contains the actual data (claims), such as user information.
// Signature: This is the crucial part. It ensures the token has not been tampered with and is authentic.
// The payload and header are Base64-encoded, meaning anyone can decode them and read the data inside (using jwt.decode), but the signature is what guarantees that the token was created by a trusted source and hasn’t been modified.

// 2. The Role of jwt.decode:
// jwt.decode only decodes the token and shows you the payload. This is useful for inspecting the data, but it doesn’t tell you if the token is valid or if someone has tampered with it.

// For example:

// A JWT might contain the user’s ID (sub: "123") or role (role: "admin"), but anyone who gets hold of the token can decode it and see this information.
// Without verification, a malicious user could modify the payload (e.g., change their role from "user" to "admin") and then try to use the altered token.
// 3. The Role of jwt.verify:
// jwt.verify is needed to:

// Verify the authenticity of the token.
// Ensure it hasn't been tampered with.
// The signature in a JWT is created using a secret key known only to the server. When you call jwt.verify, it:

// Recreates the signature based on the header and payload.
// Compares the recreated signature with the signature in the token.
// If the signatures match, the token is valid and can be trusted. If they don’t match, it means the token has been altered (tampered with), and it should be rejected.

//------------{Project}-------------
// Lets start by creating our assignment for today
// A website which has 2 endpoints - 
// POST /signin
// Body - {
// username: string
// password: string
// }
// Returns a json web token with username encrypted

// GET /users
// Headers -
// Authorization header
// Returns an array of all users if user is signed in (token is correct)
// Returns 403 status code if not

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())
const ALL_USERS = [
  {
    username: "rajan@gmail.com",
    password: "123321",
    name: "Rajan Suan",
  },
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "Harkirat singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  let userExistence = false;
  for(let i=0;i<ALL_USERS.length;i++){
    if(username==ALL_USERS[i].username && password==ALL_USERS[i].password){
        return userExistence=true;
    }
  }
  return userExistence=false; //returning outside the for loop so that it can check for all the elements so better way is find

  //cleaner way - array find function
    // function userExists(username, password) {
    //     let userExist = false;

    //     ALL_USERS.find((e) => {
    //         if (e.username === username && e.password === password) {
    //             userExist = true;
    //         }
    //     })


    //     return userExist;
    // }
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword); //creating jsonwebtoken with username encrypted with our self defined jwtpassword i.e 123456
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    res.json({
        // users: ALL_USERS //copy the token and create a authorization key value pair in headers and paste the token in the value
        users: ALL_USERS.filter((e)=>{
            if(e.username==username){
                return false;
            }
            else{
                return true;
            }
        })
    })
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

// app.use((err,req,res,next)=>{
//     res.send("Internal server error");
// })

app.listen(3000)