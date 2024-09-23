//How can you better input validation?
//to avoid manual validation
//ZOD is the popular nodejs library
const express = require("express");
const z = require("zod");
const app = express();
const port = 3007;

app.use(express.json());

// const schema = z.array(z.number()); //enough to describe the structure of our input

//question - What is we have a particular syntax of input like
// {
//     email
//     password
//     country
// }

const schema = z.object({
    email: z.string(),
    password: z.string(),
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
    console.log(response);
    
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



