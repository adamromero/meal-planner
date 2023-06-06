const express = require("express");
const router = express.Router();
const {
   getMealsByUser,
   getMeals,
   createMeal,
   updateMeal,
   deleteMeal,
} = require("../controllers/mealController");

router.route("/:id").get(getMealsByUser).post(createMeal);

router.route("/:id").put(updateMeal).delete(deleteMeal);

module.exports = router;
