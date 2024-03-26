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
router.get("/form/response/:id", (req, res) => {
  const id = req.params.id;

  // Select form, questions, and options data based on the form ID
  db.query(
    "SELECT f.title AS form_title, f.description AS form_description, " +
      "q.name AS question_name, q.require AS question_require, " +
      "q.type AS question_type, q.addOthers AS question_addOthers, " +
      "GROUP_CONCAT(o.option_text) AS option_texts " +
      "FROM forms f " +
      "JOIN questions q ON f.id = q.form_id " +
      "LEFT JOIN options o ON q.id = o.question_id " +
      "WHERE f.id = ? " +
      "GROUP BY q.id",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      // Check if any data is returned
      if (result.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Form data not found" });
      }

      // Initialize the form object
      const formData = {
        title: result[0].form_title,
        description: result[0].form_description,
        questions: [],
      };

      // Iterate over the result to organize questions and options
      result.forEach((row) => {
        const question = {
          questionName: row.question_name,
          require: row.question_require,
          type: row.question_type,
          addOthers: row.question_addOthers,
          options: [],
        };

        // Add options to the question if available
        if (row.option_texts) {
          question.options = row.option_texts.split(",");
        }

        // Push the question to the formData
        formData.questions.push(question);
      });

      res.json({ success: true, data: formData });
    }
  );
});

module.exports = router;
