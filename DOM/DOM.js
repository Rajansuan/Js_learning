// function calElements() {
//     var x = document.getElementById("LoginForm").elements.length;
//     var y = document.getElementById("LoginForm").elements[0].value;
//     document.getElementById("displayItems").innerHTML = "Total number of elements: " + x + " and value: " + y;
// }

const express = require('express');
const app = express();
const port = 3005;

app.get("/sum",(req,res)=>{
    console.log('sum called');
    
    let num1 = req.query.a;
    let num2 = req.query.b;
    let cal = Number(num1) + Number(num2);
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }).json({data: `Sum of ${num1} and ${num2} is ${cal}`});
    console.log(`res.json({data: Sum of ${num1} and ${num2} is ${cal}});`);
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})