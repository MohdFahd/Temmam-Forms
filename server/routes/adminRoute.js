const express = require("express");
const router = express.Router();
const db = require("../Database/db.js");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (email && password) {
    console.log(process.env.JWT_SECRET);

    // Query the database for the provided username and password
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, data) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          if (data.length > 0) {
            const id = data[0].id;
            const token = jwt.sign(
              { id },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 },
              (err, token) => {
                if (err) {
                  console.error(err);
                  res
                    .status(500)
                    .json({ success: false, message: "token error" });
                } else {
                  return res.json({ login: true, token, data });
                }
              }
            );
          } else {
            res.status(401).json({
              success: false,
              message: "Invalid username or password",
            });
          }
        }
      }
    );
  }
});

module.exports = router;
