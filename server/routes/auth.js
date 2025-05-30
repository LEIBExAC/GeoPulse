const express = require("express");
const USER = require("../models/user");
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {


        console.log("Signup Route Hitted ..")
        const { name, email, password , role } = req.body;
        // console.log("name : " + name + "  email : " + email +  "  password : " + password );
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please Enter All Fields" });
        }

        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            if(existingUser.isVerified){
                return res.status(400).json({ message: "User already exists with this email" });
            }
            else{
                existingUser.verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                existingUser.name = name;
                existingUser.password = password;
                existingUser.verificationTokenExpiresAt = Date.now() + 5 * 60 * 1000 //5 min
                return res.status(200).json({message:"verification email is resent"})
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();


        const user = new USER({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken,
            VerificationTokenExpiresAt : Date.now() + 5 * 60 * 1000 //5 min

        });

        savedUser = await user.save();

        res.status(201).json({ message: 'Signup successful', savedUser });
    }
    catch(error){
        console.log("signup error : "  +  error)
        return res.status(500).json({message:"Server Error"})
    }

})


module.exports = router;