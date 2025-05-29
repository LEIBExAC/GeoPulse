const express = require("express")
const mongoose = require("./config/dbconfig")

const app = express();
const port = 8080;

app.listen(port , (req,res)=>{
    console.log("Server is Listening on port " + port + "......")
})