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
  const { from_id } = formData;
  const data = formData.questions;
  const user_id = 2;
  console.log(from_id);

  // Check if the from_id exists in the forms table
  db.query("SELECT id FROM forms WHERE id = ?", [from_id], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    // If from_id does not exist, return an error response
    if (result.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid from_id" });
    }

    // Iterate over each question in the formData
    data.forEach((element) => {
      const { qes_id, Answer } = element;

      // If Answer is an array, insert each answer individually
      if (Array.isArray(Answer)) {
        Answer.forEach((answer) => {
          // Insert the answer into the response table
          db.query(
            "INSERT INTO response (user_id,qes_id, answer, from_id) VALUES (?,?, ?, ?)",
            [user_id, qes_id, answer, from_id],
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
          "INSERT INTO response (user_id,qes_id, answer, from_id) VALUES (?,?, ?, ?)",
          [user_id, qes_id, Answer, from_id],
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

    // Send success response after all responses are inserted
    res.json({ success: true, message: "Response submitted successfully" });
  });
});

router.get("/getResponse/:id", (req, res) => {
  const id = req.params.id;
  // Declare the response object to hold user information and questions grouped by user_id
  const responseData = {};

  // Select form, questions, and options data based on the form ID
  db.query(
    "SELECT u.id as user_id, u.name AS user_name, q.id as qes_id, q.name AS qes_name, GROUP_CONCAT(r.answer) AS answers FROM response r INNER JOIN users u ON r.user_id = u.id INNER JOIN questions q ON r.qes_id = q.id WHERE r.from_id = ? GROUP BY u.id, q.id",
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

      // Iterate over the result to organize user information and questions
      result.forEach((row) => {
        const user_id = row.user_id;
        // Check if the user_id exists in the responseData object
        if (!responseData.hasOwnProperty(user_id)) {
          // If not exists, create a new object for the user
          responseData[user_id] = {
            user_id: user_id,
            user_name: row.user_name,
            questions: [],
          };
        }
        const question = {
          id: row.qes_id,
          questionName: row.qes_name,
          answers: row.answers.split(","), // Convert the concatenated string of answers back to an array
        };
        // Push the question to the questions array of the user
        responseData[user_id].questions.push(question);
      });

      res.json({ success: true, data: responseData }); // Return the responseData object containing user information and questions
    }
  );
});
router.get("/getForms", (req, res) => {
  db.query("SELECT * FROM forms ORDER BY created_at DESC;", (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    // Send the forms as JSON
    res.json({ success: true, forms: result });
  });
});

module.exports = router;
