const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const eventRoutes = require("./routes/event.routes");
const uploadRoutes = require("./routes/upload.routes");
const bookingRoutes = require("./routes/booking.routes");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(cors());

// database
const seedCategories = async () => {
  const Category = require("./models/category.model");
  const defaultCategories = [
    { name: "Music", description: "Concerts, gigs and musical performances." },
    { name: "Tech", description: "Workshops, meetups and hackathons." },
    { name: "Business", description: "Networking, conferences and startup events." },
    { name: "Art", description: "Exhibitions, galleries and creative workshops." },
    { name: "Food", description: "Culinary experiences and food festivals." },
    { name: "Sports", description: "Games, tournaments and fitness events." },
  ];

  try {
    const count = await Category.countDocuments({ isActive: true });
    if (count === 0) {
      await Category.insertMany(defaultCategories);
      console.log("Seeded default event categories.");
    }
  } catch (error) {
    console.error("Failed to seed default categories:", error.message);
  }
};

const startServer = async () => {
  await connectDB();
  await seedCategories();

  // routes
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/", (req, res) => {
    res.send("API Running...");
  });

  const PORT = process.env.PORT || 9090;
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} 🚀`);
  });
};

startServer();
