//How can you better input validation?
//to avoid manual validation
//ZOD is the popular nodejs library
const express = require("express");
const z = require("zod");
const app = express();
const port = 3007;

app.use(express.json());

const schema = z.array(z.number()); //enough to describe the structure of our input

//question - What is we have a particular syntax of input like
// {
//     email
//     password
//     country
// }

// const schema2 = z.object({
//     email: z.string(),
//     password: z.string(),
//     country: z.literal("IN").or(z.literal("US")),
//     kidney: z.array(z.number())
// })

app.post("/health",(req,res)=>{
  const kidneys = req.body.kidney;
//   const kidneyLength = kidneys.length;
//   res.send("You have "+kidneyLength+" kidneys")
 const response = schema.safeParse(kidneys);
 if(!response.success){
    res.json({
        msg:"Invalid Inputs"
    })
 }else{
    res.send("You have "+response.data.length+" kidneys")
 }

})

app.use(function(err,req,res,next){
  res.json({
    msg:"Sorry something went wrong with our server"
  })
})

app.listen(port,()=>{
  console.log("Server is running on "+port);
})


// {
//     "email": "rajan",
//     "password": "suan",
//     "country": "IN",
//     "kidney":[1,2,3]
// }
//http://localhost:3007/health