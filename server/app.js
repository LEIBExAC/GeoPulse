const express = require("express")
const mongoose = require("./config/dbconfig")

const app = express();
const port = 8080;

app.use(express.json())
app.use(require("./routes/auth"))

app.listen(port , (req,res)=>{
    console.log("Server is Listening on port " + port + "......")
})