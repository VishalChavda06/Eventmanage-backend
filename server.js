const express = require("express");
const dontenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

dontenv.config()

const app = express()


//midddleware
app.use(express.json())

// connect to database
connectDB()

// routes
app.use("/api/users", userRoutes);


app.get("/" , (req,res)=>{
    res.send("Welcome to the Event Management API")
})


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}..🚀`);
})