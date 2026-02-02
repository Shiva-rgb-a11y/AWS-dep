require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const carRoutes = require("./routes/carRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* =========================
   Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MongoDB
========================= */
mongoose
  .connect(process.env.MONGO_URI, { dbName: "car" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

/* =========================
   API Routes
========================= */
app.use("/api", carRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


/* =========================
   Error Handler
========================= */
app.use(errorHandler);

/* =========================
   Server
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
