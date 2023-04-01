const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { sendConfirmationEmail } = require("../nodemailer");

router.post("/", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  // Generate activation code
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += characters[Math.floor(Math.random() * characters.length)];
  }
  //console.log(activationCode);
  // Check if user with the same email already exists
  let passwordIsValid = true;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).send("Email already exists");
  }
  if (user && passwordIsValid && !user.isActive) {
    return res.send({
      accesToken: null,
      message: "veullez verifier votre boite email",
    });
  }
  // Create new user with activation code

  user = new User({
    name,
    lastname,
    email,
    password,
    activationCode,
  });

  await user.save();
  sendConfirmationEmail(user.email, activationCode);
  return res.send({
    token: user.generateAuthToken(),
  });
});
router.post("/excel", async (req, res) => {
  const { users } = req.body;
  console.log(users);
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += characters[Math.floor(Math.random() * characters.length)];
  }
  for (let j = 0; j < users.length; j++) {
    let user = await User.findOne({ email: users[j].email });
    

    const newUser = new User({
      name: users[j].name,
      lastname: users[j].lastname,
      email: users[j].email,
      password: users[j].password,
      role: "admin",
      activationCode,
    });

    await newUser.save();
  }
});
module.exports = router;
