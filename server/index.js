const express = require("express");
const admin = require("./routes/adminRoute");
const user = require("./routes/userRoute");
const cors = require("cors");
const dotenv = require("dotenv");

// express app
const app = express();
dotenv.config({ path: "./.env" });

// Enable CORS
app.use(cors());
// listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// handle request from post form
app.use(express.urlencoded({ extended: true }));

// Redirect from root to admin route
app.get("/", (req, res) => {
  res.send("Hello World");
  // res.redirect("/admin"); // Corrected redirection
});

// Define admin route
app.use("/admin", admin);
app.use("/user", user);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
