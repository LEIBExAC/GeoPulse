const express = require("express")
const mongoose = require("./config/dbconfig")
const cookieParser = require('cookie-parser');


const app = express();
const port = 8080;

app.use(express.json())
app.use(cookieParser()); 
app.use(require("./routes/auth"))
app.use("/tags", require("./routes/tagRoute"));


app.listen(port , (req,res)=>{
    console.log("Server is Listening on port " + port + "......")
})