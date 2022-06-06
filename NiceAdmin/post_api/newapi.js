const express = require("express");
require("./connection");
const app = express();
const port = process.env.PORT || 8000;

// app.get("/" ,(req,res)=>{
//     res.send("welcome to home page");
// })

// Add a new user from admin
app.post("/add-new-user" , (req,res)=>{
    res.send("you add new user successfully");
})
app.listen(port , ()=> {
    console.log ('connection is setup at 8000' );
})