const express = require("express");
const router = express.Router();

const {
  addCar,
  getCars
} = require("../controllers/carController");

router.post("/add-car", addCar);
router.get("/cars", getCars);

module.exports = router;
