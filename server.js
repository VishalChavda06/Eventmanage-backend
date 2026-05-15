const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(cors());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} 🚀`);
});
