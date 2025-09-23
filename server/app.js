const express = require("express")
const mongoose = require("./config/dbconfig")
const cookieParser = require('cookie-parser');
const cors = require("cors");
const FRONT_END_URL = require("./utility/keys")


const app = express();
const port = 8080;


app.use(cors({
  origin: FRONT_END_URL, // your frontend URL
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
app.use("/contact", require("./routes/contact"));
app.use("/location", require("./routes/location"))
app.use("/geofence", require("./routes/geofence"));


app.listen(port, (req, res) => {
  console.log("Server is Listening on port " + port + "......")
})