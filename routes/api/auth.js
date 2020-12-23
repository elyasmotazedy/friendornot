const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const Profile = require("../../models/Profile");

// @route   GET api/auth
// @des     Test route
// @access  Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    // const user = await Profile.findOne({
    //   user: req.user.id,
    // }).populate("user",['-password']);

    // console.log("user", user);
    res.json({ user, profile });
    // res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// LOGIN

// @route   POST api/users
// @des     Authenticate user & get token
// @access  Public

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/forget", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No such a user with this email" }] });
    }
    const token = uuid.v4();

    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      }
    );
    await nodemailerWrapper(token, req.body.email, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

async function nodemailerWrapper(token, email, res) {
  const output = `
  <h3>For changing your password click link below</h3>
  <a herf="http://localhost:3000/reset/${token}" >http://localhost:3000/reset/${token}</a>
`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(
    smtpTransport({
      name: "www.wewriteup.com",
      host: "mail.wewriteup.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "test@wewriteup.com", // generated ethereal user
        pass: "Ely@s1374", // generated ethereal password
      },
      sendmail: true,
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <test@wewriteup.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Change password request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({ msg: "Email has been sent" });
    return true;
  });
}

router.post(
  "/reset",
  [
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;
    try {
      let resetRequested = await User.findOne({
        resetPasswordToken: id,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!resetRequested) {
        return res.status(400).json({
          errors: [{ msg: "Password rest token is invalid or has expired." }],
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { resetPasswordToken: id },
        {
          $set: {
            password: hashPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
          },
        }
      );
      res.json({ msg: "Success! your password has been changed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
