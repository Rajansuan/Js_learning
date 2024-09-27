//example - Bank and cheques
//My cheque contains my signature and it is open and bank verify it, so my cheque book is like a json web token

//Three steps for jwt-
//1. Create a token
//2. Decode the token //decoding can be done by anyone
//3. Verify the token //verification can only be done by backend

const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "rajansuan123";

const app = express();
app.use(express.json()); //middleware to parse body requests

const customer_data = {
  name: "Rajan",
  account_number: "1234",
}

//generating token with the sign function
const token = jwt.sign(customer_data, jwtSecretKey);
//here token is generated with customer data and the jwtSecretKey, so the token can only be verified with the same jwtSecretKey.

console.log(token);

app.use((err,req,res,next)=>{
  res.json({
    msg:"Internal server error"
  })
})

app.listen(3000);