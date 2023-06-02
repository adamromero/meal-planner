const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   _id: { type: mongoose.Types.ObjectId, auto: true },
   name: {
      type: String,
      required: true,
      maxLength: 100,
   },
   image: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      maxLength: 100,
   },
   password: {
      type: String,
      required: true,
   },
   meals: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Meal",
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
