const Car = require("../models/Car");

exports.addCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
};
exports.getCars = async (req, res, next) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    next(err);
  }
};
