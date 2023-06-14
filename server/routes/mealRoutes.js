const express = require("express");
const router = express.Router();
const {
   getMealsByUser,
   getMeals,
   createMeal,
   updateMeal,
   deleteMeal,
} = require("../controllers/mealController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(getMealsByUser).post(createMeal);

router.route("/:id").put(updateMeal).delete(deleteMeal);

module.exports = router;
