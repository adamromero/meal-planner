const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
   {
      _id: { type: mongoose.Types.ObjectId, auto: true },
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
      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
