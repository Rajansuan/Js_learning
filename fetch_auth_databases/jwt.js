const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "1234567";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "Rajan",
    password: "1234",
    fullname: "Rajan Suan",
  },
  {
    username: "Nitin",
    password: "123Pass",
    fullname: "Nitin Chauhan",
  },
  {
    username: "Jaswinder",
    password: "321Pass",
    fullname: "Jaswinder Singh Chauhan",
  },
];

app.get("/users", (req, res) => {
  const token = req.headers.token;
  try{
    const decodeToken = jwt.verify(token, jwtPassword);
    const username = decodeToken.user_name;
    res.json({
      users: ALL_USERS.filter((e)=>{
        if(e.username==username){
          return false
        }
        else{
          return true
        }
      })
    })
  }catch(err){
    res.status(403).json({
      msg:"Invalid token"
    })
  }
});

const userExists = (username, password) => {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (username == ALL_USERS[i].username && password == ALL_USERS[i].password) {
      return true;
    }
  }
  return false;
};

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    res.json({
      msg: "User does not exist or incorrect username and password",
    });
  }
    // console.log(username," ",password);
    const token = jwt.sign({ user_name: username }, jwtPassword);
    // console.log(token);
    res.json({
      token,
    });
});

app.use("/", (err, req, res, next) => {
  res.json({
    msg: "Internal server error",
  });
});

app.listen(3005);
