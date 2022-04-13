const express = require("express");
const router = express.Router();
const {
   getMeals,
   createMeal,
   updateMeal,
   deleteMeal,
} = require("../controllers/mealController");

router.route("/").get(getMeals).post(createMeal);

router.route("/:id").put(updateMeal).delete(deleteMeal);

module.exports = router;
