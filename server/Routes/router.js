const express = require("express");
const router = new express.Router();
const con = require("../DB/DB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/reg", (req, res) => {
  const { name, email, phone, username, role } = req.body;
  const pass = bcrypt.hashSync(req.body.password);
  const select = `SELECT * FROM user WHERE email=?`;
  const insert = `INSERT INTO user SET?`;
  con.query(select, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      if (email || username) {
        return res
          .status(400)
          .json({ status: 400, message: "This email is already used" });
      }
    } else {
      con.query(
        insert,
        { name, email, password: pass, username, role, phone },
        (err, result) => {
          if (err) throw err;
          return res.status(201).json({ status: 201, data: req.body });
        }
      );
    }
  });
});

router.post("/login", (req, res) => {
  const { email } = req.body;
  const select = `SELECT * FROM user WHERE email=?`;
  con.query(select, [email], (err, results) => {
    if (err) {
      throw err;
    } else if (!results || results.length === 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    const match = bcrypt.compareSync(req.body.password, results[0].password);
    if (!match) {
      return res.status(401).json({ status: 401, message: "Invalid password" });
    }
    const token = jwt.sign({ id: results[0].id }, "secretkey", {
      expiresIn: "1h",
    });
    return res.json({
      status: 200,
      message: "Logged in successfully",
      token,
    });
  });
});
router.get("/getAll", (req, res) => {
  const select = "SELECT * FROM user";
  
  con.query(select, (err, results) => {
    if (err) throw err;
    return res.json({ status: 200, data: results});
  });
});


// Get users Added post

router.get("/getUsersAddedPost", (req, res) => {
  const select = "SELECT * FROM post";

  con.query(select, (err, results) => {
    if (err) throw err;
    return res.json({ status: 200, data: results});
  });
});
module.exports = router;
