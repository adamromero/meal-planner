const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../client/dist")));
   app.get("*", (req, res) =>
      res.sendFile(
         path.resolve(__dirname, "../", "client", "dist", "index.html")
      )
   );
} else {
   app.get("/", (req, res) =>
      res.send("Please set environment variable to production")
   );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
