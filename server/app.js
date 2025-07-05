const express = require("express")
const mongoose = require("./config/dbconfig")
const cookieParser = require('cookie-parser');
const cors = require("cors");


const app = express();
const port = 8080;


app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  // origin: true, //for testing on postman
  credentials: true, // to allow cookies
}));

app.get("/", (req, res) => {
  res.send(`
    <pre style="font-family: 'Courier New', monospace; color: #4CAF50; font-size: 25px;">
🚀 Welcome to the GeoPulse Server!
✅ Server is running perfectly.
    </pre>
  `);
});


app.use(express.json())
app.use(cookieParser());
app.use(require("./routes/auth"))
app.use(require("./routes/tag"));
app.use("/location", require("./routes/location"))
app.use("/geofence", require("./routes/geofence"));


app.listen(port, (req, res) => {
  console.log("Server is Listening on port " + port + "......")
})