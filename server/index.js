const express = require("express");
const admin = require("./routes/adminRoute");
// express app
const app = express();
// listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// handle request from post from
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/admin", admin);
});
// Define admin route
app.use("/admin", admin);
