const asyncHandler = require("express-async-handler");

const Meal = require("../models/mealModel");

const getMeals = asyncHandler(async (req, res) => {
   const meals = await Meal.find({});
   res.status(200).json(meals);
});

const createMeal = asyncHandler(async (req, res) => {
   if (!req.body.name || !req.body.day) {
      res.status(400);
      throw new Error("Please add required fields");
   }

   const meal = await Meal.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      day: req.body.day,
      isSaved: req.body.isSaved,
   });

   res.status(200).json(meal);
});

const updateMeal = asyncHandler(async (req, res) => {
   const meal = await Meal.findById(req.params.id);

   if (!meal) {
      res.status(400).json("Meal not found");
   }

   const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   res.status(200).json(updatedMeal);
});

const deleteMeal = asyncHandler(async (req, res) => {
   const meal = await Meal.findById(req.params.id);

   if (!meal) {
      res.status(400).json("Meal not found");
   }

   await meal.remove();
   res.status(200).json({ id: req.params.id });
});

module.exports = {
   getMeals,
   createMeal,
   updateMeal,
   deleteMeal,
};
