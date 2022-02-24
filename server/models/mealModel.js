const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please add a name"],
      },
      ingredients: [String],
      day: {
         type: String,
         required: [true, "Please add a day"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Meal", mealSchema);
