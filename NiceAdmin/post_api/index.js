const express = require("express") // Include ExpressJS
const bodyparser=require("body-parser");
const app = express(); // Create an ExpressJS app , and calling express function to use functionaity
const { MongoClient } = require('mongodb'); // Include MongoClient
const {signupValidation , loginValidation} = require('./validations');
const { validationResult } = require('express-validator');
let user

// url of mongodb
const url = 'mongodb://localhost:27017';    
const dbName = 'trackingdevice'; // Database Name
const client = new MongoClient(url);
client.connect();
user = client.db(dbName).collection('user'); // Name of collection

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// /trip = function or raout
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false})); //urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser. Syntax: express.urlencoded( [options] ) Parameter: The options parameter contains various property like extended, inflate, limit, verify etc.
app.use(bodyparser.json()); //  we use bodyparser.json() becuse req in body in the form of json. 

// adding new user (sign-up route)

    app.post("/signup",signupValidation,  async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body,"You Add User sucesfully")
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    user.insertMany([{name:name , email:email , username:username ,password:password}],(err,result)=>{
        if(err){
            console.error(err)
            res.status(500).json({err:err})
            return
        }
        console.group(result)
        res.status(200).json({ok:true})
    })

})

// login api for admin

    app.post("/login" ,loginValidation, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const email = req.body.email;
    const password = req.body.password;
    const response= await user.findOne({email:email},{password:password} )

    if(response){
        res.status(200).json({message:"login successfully",response})
    }else {
        
      res.status(500).json({error:"invalid email or passworrd!"})
    }
    console.log(response)
  
})
// list all users
app.get("/list-all-users" ,async(req,res)=>{
    const response= await user.find().toArray();
    if(response){
        res.status(200).json({message:"Data Find successfully",response})
    }else {
        
      res.status(500).json({error:"Data not found"})
    }
    console.log(response)
  
    
})
// update profile of user
app.put("/updateprofile:name",async(req,res)=>{
    console.log(req.body)
    user = client.db(dbName).collection('user'); 
    const response= await user.updateOne(
        {"email":req.body.email},
        { $set: { name: req.body.name }}
    )

 
    if(response){
        res.status(200).json({message:"update successfully",response})
    }else {
        
      res.status(500).json({error:"profile not found"})
    }
    console.log(response)
})


app.patch("/Students/:name",async(req,res) => {
       
    try {
       const name = req.params.body;
       const Updateusers = await  user.findByIdAndUpdate(name,req.body,{
           new : true
       });
       res.send(Updateusers);
    } catch(e){
        res.status(404).send(e);
    }
   
})

//delete profile api



app.listen(8000,()=>{
    console.log("server rēady or database connected succsesfully")
})