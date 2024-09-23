//How can you better input validation?
//to avoid manual validation
//ZOD is the popular nodejs library

//Difference between parse and safeParse in Zod
// In Zod, both parse and safeParse are methods used to validate data against a schema, but they differ in how they handle validation errors.
//// This will not throw an error, but return a result object
// const result = schema.safeParse(123); // Invalid input (expects a string)

const express = require("express");
const z = require("zod");
const app = express();
const port = 3007;

app.use(express.json());

// const schema = z.array(z.number()); //enough to describe the structure of our input

//question - What is we have a particular syntax of input like
// {
//     "email": "rcs@gmail.com",
//     "password": "rajan123",
//     "country": "IN",
//     "kidneys": [1, 2, 3, 4, 9]
//   }
  

const schema = z.object({
    email: z.string().email(),
    password: z.coerce.string().min(8), //ceorcion meaning is to push someone to do something - here it converts number to string
    country: z.literal("IN").or(z.literal("US")),
    kidneys: z.array(z.number())
})

app.post("/health",(req,res)=>{

    // const datas = req.body;
    // console.log(datas);
    const emaily = req.body.email;
    console.log(emaily);
    // const kidneys = req.body;
    // const kidneyLength = kidneys.length;
    // res.send("You have "+kidneyLength+" kidneys")

    const response = schema.safeParse(req.body);
    console.log(response.data.password);
    console.log(typeof(response.data.password));
    
    if(!response.success){
        res.json({
            msg:"Invalid Inputs"
        })
    }else{
        res.send("You have "+response.data.kidneys.length+" kidneys") //because we get data object in response from zod
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

//validate through function
// function validateInput(arr){
//     if(typeof arr == 'object' && arr.length >=1)
// }
// but this can be easily achievable through zod
 //just import zod and create scheme = zod.array(zod.number()) and then response = schema.safeParse(yourInput), then console.log response

 
