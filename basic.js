// const express = require("express");
// const app = express();
// const port = 3000;

// //in memory database and it get vanished as we restart the server
// const users = [
//   {
//     name: "John",
//     kidneys: [
//       {
//         healthy: false,
//       },
//       {
//         healthy: false,
//       },
//     ],
//   },
//   {
//     name: "Cena",
//     kidneys: [
//       {
//         healthy: false,
//       },
//       {
//         healthy: false,
//       },
//     ],
//   },
// ];

// //middlewares
// app.use(express.json());

// //routes can be same for different methods
// app.get("/", (req, res) => {
//   let totalJohnKidneys = users[0].kidneys.length;
//   let johnKidneys = users[0].kidneys;
//   let healthyKidneys = 0;

//   for (let i = 0; i < totalJohnKidneys; i++) {
//     if (johnKidneys[i].healthy == true) {
//       healthyKidneys += 1;
//     }
//   }
//   let notHealthyKidneys = totalJohnKidneys - healthyKidneys;
//   res.json({
//     "Total John's Kidneys are ": totalJohnKidneys,
//     "John healthy kidneys are ": healthyKidneys,
//     "John's Unhealthy Kidneys are ": notHealthyKidneys,
//   });
// });

// app.post("/", (req, res) => {
//   const newKidney = req.body.newKidney;
//   users[0].kidneys.push({
//     healthy: newKidney,
//   });
//   res.json({
//     msg: "done",
//   });
// });

// app.put("/", (req, res) => {
//   for (let i = 0; i < users[0].kidneys.length; i++) {
//     users[0].kidneys[i].healthy = true;
//   }
//   //request will hang if we do not send the res.json
//   res.json({
//     msg: "All the kidneys are replaced and healthy",
//   });
// });

// app.delete("/", (req, res) => {
//   //Egde cases
//   //only runs when there is atleast one unhealthy kidneys is there else return 411 status code meaning wrong input
//   let unhealthyKidney = false;
//   for (let i = 0; i < users[0].kidneys.length; i++) {
//     if (users[0].kidneys[i].healthy == false) {
//       unhealthyKidney = true;
//       break;
//     }
//   }

//   if (unhealthyKidney) {
//     const newKidneys = [];
//     for (let i = 0; i < users[0].kidneys.length; i++) {
//       if (users[0].kidneys[i].healthy == true) {
//         newKidneys.push({
//           healthy: true,
//         });
//       }
//     }
//     users[0].kidneys = newKidneys;
//     res.json({
//       msg: "Successfully deleted the unhealthy kidneys",
//     });
//   }
//   else{
//     res.status(411).json({
//       msg: "There is no unhealthy kidney"
//     });
//   }
// });

// app.listen(port);


//-----------------------

// //to get anything written after the url using colon :

// //request to send is GET with url - http://localhost:3000/files/a.txt

// const express = require("express");
// const app = express();
// const fs = require("fs")
// app.get("/files/:fileName",(req,res)=>{
//   const nameOfFile = req.params.fileName;
//   console.log(nameOfFile);
//   fs.readFile(nameOfFile, "utf-8", (err,data)=>{
//     res.json({
//       data
//     })
//   })
// })

// app.listen(3000, function(){
//     console.log("Server is running on 3000")
// })

// 
