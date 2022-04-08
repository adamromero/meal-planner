const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please add a name"],
      },
      ingredients: [{ type: String }],
      day: {
         type: String,
         required: [true, "Please add a day"],
      },
      isSaved: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Meal", mealSchema);
