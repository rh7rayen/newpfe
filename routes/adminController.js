const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Level = require("../Models/Level");
const Classe = require("../Models/Classe");
const uploadMiddleware = require("../middlewares/MulterMiddleware");

router.get("/", async (req, res) => {
  let users = await User.find({ role: "admin" });
  res.send(users);
});
router.delete("/deleteuser/:id", async (req, res) => {
  let id = req.params.id;
  User.deleteOne({ _id: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.post("/addlevel", async (req, res) => {
  const { levelName, year } = req.body;

  const level = new Level({
    levelName: levelName,
    year: year,
  });

  level
    .save()
    .then(function () {
      console.log("Data added with success"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.get("/getLavel", async (req, res) => {
  let level = await Level.find({});
  res.send(level);
});
router.delete("/deleteLavel/:id", async (req, res) => {
  let id = req.params.id;
  Level.deleteOne({ _id: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.get("/getUpdateLevel/:id", async (req, res) => {
  let id = req.params.id;
  let level = await Level.find({ _id: id });
  res.send(level);
});
router.post("/updataLevel/:id", async (req, res) => {
  let id = req.params.id;
  const { levelName, year } = req.body;
  await Level.updateOne({ _id: id }, { levelName, year });
  res.send("updated work with success");
});

router.post("/updataLevel/:id", async (req, res) => {
  let id = req.params.id;
  const { levelName, year } = req.body;
  await Level.updateOne({ _id: id }, { levelName, year });
  res.send("updated work with success");
});
router.post("/addclasse", async (req, res) => {
  const { classes, id_Level } = req.body;
  console;
  const classe = new Classe({
    classeName: classes,
    level_id: id_Level,
  });

  classe
    .save()
    .then(function () {
      console.log("Data added with success"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.get("/getallclasse", async (req, res) => {
  let classe = await Classe.find({});
  res.send(classe);
});
router.delete("/deleteClasse/:id", async (req, res) => {
  let id = req.params.id;
  Classe.deleteOne({ _id: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.post("/addStudent", async (req, res) => {
  const { users } = req.body;
  const { id } = req.body;
  console.log(id);
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += characters[Math.floor(Math.random() * characters.length)];
  }
  for (let j = 0; j < users.length; j++) {
    let user = await User.findOne({ email: users[j].email });
    if (user)
      return res
        .status(404)
        .send(
          "cette email est disponible il faut supprimer cette email" +
            users[j].email
        );

    const newUser = new User({
      name: users[j].name,
      lastname: users[j].lastname,
      email: users[j].email,
      password: users[j].password,
      role: "eleve",
      activationCode,
      classe_id: id,
    });

    await newUser.save();
  }

  return res.status(200).send("ok");
});

router.get("/getAllStudent/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const users = await User.find({ classe_id: id }).populate("classe_id");
    if (users) {
      res.send(users);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/UploadsImage",
  uploadMiddleware.single("photo"),
  async (req, res) => {
    const photo = req.file.filename;
    user
      .updateOne({ id: req })
      .then((data) => {
        console.log("uploaded successfully");
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  }
);

module.exports = router;
