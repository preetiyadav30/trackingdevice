
//  our index.js will have all our routes and imported dependencies
// So let’s write our basic node.js app in index.js

const express = require("express");  //express : Allows you to define routes of your application based on HTTP methods and URLs.
const mongoose = require("mongoose"); //mongoose : It is used to connect to our MongoDB database.
const bodyparser=require("body-parser"); //body-parser : It is used to handle HTTP post requests and extract the entire body portion of an incoming request stream and exposes it on req.body.
const cookieparser=require("cookie-parser"); //cookie-parser : It is used for parsing the cookies
const db = require("./config/config").get(process.env.NODE_ENV); //let’s connect our app to the database in index.js
const User=require('./models/user');
const {auth} =require('./middleweres/auth');
const { get } = require("mongoose");



const app= express();
// app use the functinality

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE , {  useNewUrlParser:true, useUnifiedTopology: true} ,function(err){
    if(err) console.log(err);
    console.log("database is connected");
})

app.use(bodyparser.urlencoded({extended:false})); //urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser. Syntax: express.urlencoded( [options] ) Parameter: The options parameter contains various property like extended, inflate, limit, verify etc.
app.use(bodyparser.json()); //  we use bodyparser.json() becuse req in body in the form of json. 
app.use(cookieparser()); //  It is used for parsing the cookies
 

app.get("/" , function(req,res){
    res.status(200).send("welcome to our project");
});


// adding new user (sign-up route)
app.post('/api/register',function(req,res){
    // taking a user
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
   if(name=='')return res.status(400).json({message: "pealse enter name"});
   if(email=='')return res.status(400).json({message: "pealse enter email"});
   if(username=='')return res.status(400).json({message: "pealse enter username"});
   if(password=='')return res.status(400).json({message: "pealse enter password"});
   else{
     
      const db = mongoose.ADMINDATABASE;
      ADMINCOLLECTION = db.collection("ADMINCOLLECTION");
      ADMINCOLLECTION.insert({name:"name"},{email:"email"},{username:"username"},{password:"password"} , (err, result) =>{
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
          }
          console.log(result)
          res.status(200).json({ ok: true })
      });

   }
    
    // User.findOne({email:newuser.email},function(err,user){
    //     if(user) return res.status(400).json({ auth : false, message :"email exits"});
 
    //     newuser.save((err,doc)=>{
    //         if(err) {console.log(err);
    //             return res.status(400).json({ success : false});}
    //         res.status(200).json({
    //             succes:true,
    //             user : doc
    //         });
    //     });
    // });
 });

 
// login user
// app.post('/api/login', function(req,res){
//     let token=req.cookies.auth;
//     User.findByToken(token,(err,user)=>{
//         if(err) return  res(err);
//         if(user) return res.status(400).json({
//             error :true,
//             message:"You are already logged in"
//         });
    
//         else{
//             User.findOne({'email':req.body.email},function(err,user){
//                 if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
//                 user.comparepassword(req.body.password,(err,isMatch)=>{
//                     if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
//                 user.generateToken((err,user)=>{
//                     if(err) return res.status(400).send(err);
//                     res.cookie('auth',user.token).json({
//                         isAuth : true,
//                         id : user._id
//                         ,email : user.email
//                     });
//                 });    
//             });
//           });
//         }
//     });
// });


// get logged in user
// app.get('/api/profile',auth,function(req,res){
//     res.json({
//         isAuth: true,
//         id: req.user._id,
//         email: req.user.email,
//         name: req.user.firstname + req.user.lastname
        
//     })
// });

//logout user
// app.get('/api/logout',auth,function(req,res){
//     req.user.deleteToken(req.token,(err,user)=>{
//         if(err) return res.status(400).send(err);
//         res.sendStatus(200);
//     });

// }); 

//listening port
const PORT=process.env.PORT||6000;
app.listen(PORT ,( ) =>{
    console.log(`app is live at ${PORT}`);
});