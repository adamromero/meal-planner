const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const port = process.env.port || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/meals", require("./routes/mealRoutes"));

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
