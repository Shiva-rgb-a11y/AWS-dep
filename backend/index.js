require("dotenv").config();
const Car = require("./models/Car");
const carRoutes = require("./routes/carRoutes");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors()); 
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "car"
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

mongoose.connection.once("open", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});

/* =========================
   Routes
========================= */
app.get("/", (req, res) => {
  res.send("Car backend running");
});

app.use("/api", carRoutes);



/* =========================
   Error Handler (ALWAYS LAST)
========================= */
app.use(errorHandler);

/* =========================
   Server
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
