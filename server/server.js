const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const port = process.env.port || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/meals", require("./routes/mealRoutes"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "..client/dist")));
   app.get("*", (req, res) => {
      res.sendFile(
         path.resolve(__dirname, "../", "client", "dist", "index.html")
      );
   });
} else {
   app.get("/", (req, res) =>
      res.send("Please set environment variable to production")
   );
}

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
