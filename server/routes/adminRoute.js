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

router.post("/form/store", (req, res) => {
  const formData = req.body.form;
  formData.questions;
  // Insert form into the forms table
  db.query(
    "INSERT INTO forms (title, description) VALUES (?, ?)",
    [formData.title, formData.description],
    (err, formResult) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      console.log("form inserted");

      const formId = formResult.insertId;

      // Insert questions into the questions table
      const questions = formData.questions;
      questions.forEach((question) => {
        db.query(
          "INSERT INTO questions (form_id, name, `require`, type, addOthers) VALUES (?, ?, ?, ?, ?)",
          [
            formId,
            question.questionName,
            question.require,
            question.type,
            question.addOthers,
          ],
          (err, questionResult) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }

            const questionId = questionResult.insertId;

            // Insert options into the options table (if any)
            if (question.options && question.options.length > 0) {
              question.options.forEach((option) => {
                db.query(
                  "INSERT INTO options (question_id, option_text) VALUES (?, ?)",
                  [questionId, option],
                  (err) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                      });
                    }
                  }
                );
              });
            }
          }
        );
      });

      res.json({ success: true, message: "Form added successfully" });
    }
  );
});
router.post("/form/responseSubmission", (req, res) => {
  const formData = req.body.form;
  const data = formData.questions;

  // Iterate over each question in the formData
  data.forEach((element) => {
    const { qes_id, Answer } = element;

    // If Answer is an array, insert each answer individually
    if (Array.isArray(Answer)) {
      Answer.forEach((answer) => {
        // Insert the answer into the response table
        db.query(
          "INSERT INTO response (qes_id, answer) VALUES (?, ?)",
          [qes_id, answer],
          (err, result) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }
            console.log(`Inserted answer for question ${qes_id}: ${answer}`);
          }
        );
      });
    } else {
      // If Answer is not an array, insert it as a single value
      db.query(
        "INSERT INTO response (qes_id, answer) VALUES (?, ?)",
        [qes_id, Answer],
        (err, result) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          }
          console.log(`Inserted answer for question ${qes_id}: ${Answer}`);
        }
      );
    }
  });

  res.json({ success: true, message: "Response submitted successfully" });
});

module.exports = router;
