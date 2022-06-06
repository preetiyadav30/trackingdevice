const mongoose=require("mongoose");
const validator=require("validator");

const usersSchema = new mongoose.Schema( {
        name:{
            type:String,
            required:true,
            minlength:3
        },
        email:{
            type:String,
            required:true,
            unique:[true , "Email id is already present"],
            validator(value){
                if(validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
        username:{
            type:String,
            required:true,
            minlength:3,
            unique:[true , "Invalid Username"],
            validator(value){
                if(validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
})