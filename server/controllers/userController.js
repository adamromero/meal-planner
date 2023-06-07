const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password, confirmPassword } = req.body;

   console.log(name, email, password, confirmPassword);

   if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "Please provide required fields" });
      return;
   }

   if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400).json({ message: "User already exists" });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const user = await User.create({ name, email, password: hashedPassword });

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         //token: generateToken(user._id)
      });
   } else {
      res.status(400).json({
         message: "Something went wrong, user not created",
      });
   }
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400).json({ message: "Please provide required fields" });
   }

   const user = await User.findOne({ email });
   if (!user) {
      res.status(400).json({ message: "User not found" });
   }

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         //token: generateToken(user._id)
      });
   } else {
      res.status(400).json({
         message: "Invalid credentials",
      });
   }
});

const updatePassword = asyncHandler(async (req, res) => {});

module.exports = { registerUser, loginUser, updatePassword };
