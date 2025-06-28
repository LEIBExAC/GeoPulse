const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
    },
    password : {
        type : String,
        required : true,
    },
    profile:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIs1XePP0G1O0AQB8x6uxPkXyY_PvXlYWGLTJWZfpios_3gsrcqX_jZz1dkxjgCZjrC-w&usqp=CAU"
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type : String,
        default:"user",
        enum:["user","admin"]
    },


    resetPasswordToken : String,
    resetPasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
})

module.exports = mongoose.model("USER" , userSchema);