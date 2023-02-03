const express = require("express");
const client = require("../db");
const jwt = require("jsonwebtoken");
const passwordResetRoute = express.Router();
var nodemailer = require("nodemailer");

//setting up nodemailer with transport
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nodetestmail123@gmail.com",
    pass: "socgztlrtowjuxrl",
  },
});

const JWT_SECRET = "i love books";
passwordResetRoute.post("/reset-password", async (req: any, res: any) => {
  const { email } = req.body;
  //check is email exist in the database
  try {
    const emailExist = await client.query(  //variable for holding select query for all colums with valid email
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (emailExist.rowCount != 0) {
      const secret = JWT_SECRET + emailExist.rows[0].password;
      //creating jwt payload
      const payload = {
        email: emailExist.rows[0].email,
        id: emailExist.rows[0].id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1m" });
      const link = `http://localhost:3000/reset-password/${payload.id}/${token}`;

      const mailOptions = {
        //nodemailer options for sending mail to the user
        from: "nodetestmail123@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "RESET PASSWORD", // Subject line
        html: `<a href=${link}>reset</a>`, // plain text body
      };
      transporter.sendMail(mailOptions, function (err: any, info: any) {
        //sending mail using the options provide above
        if (err) console.log(err);
        else console.log(info);
        res.json({ message: "Reset link has been sent to your mail" });
      });
    } else {
      console.log("user not registered");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = passwordResetRoute;
