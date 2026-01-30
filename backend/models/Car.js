const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Car = mongoose.model("Car", CarSchema,"car");
module.exports = Car;
