const express = require("express")
const mongoose = require("./config/dbconfig")
const cookieParser = require('cookie-parser');
const cors = require("cors");


const app = express();
const port = 8080;


app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // to allow cookies
}));

app.use(express.json())
app.use(cookieParser()); 
app.use(require("./routes/auth"))


app.listen(port , (req,res)=>{
    console.log("Server is Listening on port " + port + "......")
})