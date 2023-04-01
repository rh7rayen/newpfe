const express = require("express");
const router = express.Router();
const User = require("../Models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send("Email is required.");
  if (!password) return res.status(400).send("Password is required.");

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).send("User with given email does not exist.");

  const isMatch = await user.checkPassword(password);
  if (!isMatch)
    return res.status(400).send("Password is not correct for given user.");

  const token = user.generateAuthToken();
  return res.send(token);
});
router.post("/verifyuser/:activationcode", async (req, res) => {
  user = User.findOne({ activationCode: req.params.activationcode }).then(
    (user) => {
      if (!user) {
        res.send({
          message: "ce code d'activation est faut",
        });
      }
      user.isActive = true;
      user.save();
      res.send({
        message: "le compte est activé avec succées",
      });
    }
  );
});

module.exports = router;
