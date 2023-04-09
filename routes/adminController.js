const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Level = require("../Models/Level");
const Classe = require("../Models/Classe");
const Subject = require("../Models/Subject");
const Event = require("../Models/Event");

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
    const userId = req.query.user_id;
    console.log(photo);
    try {
      const result = await User.updateOne(
        { _id: userId },
        { image_profile: photo }
      );
      console.log(result);
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("An error occurred while uploading the file. Please try again.");
    }
  }
);
router.get("/getProfile/:id", async (req, res) => {
  let id = req.params.id;

  const allPhotos = await User.find({ _id: id });
  res.send(allPhotos);
});
router.post("/UpdatePassword", async (req, res) => {
  const { name, lastname, email, pwd1, pwd2, pwd3 } = req.body;
  const user = await User.findOne({ email });
  console.log(pwd2);
  console.log(pwd3);

  const isMatch = await user.checkPassword(pwd1);
  if (!isMatch) return res.status(400).send("modepasse incorrect.");
  if (pwd2 !== pwd3)
    return res.status(400).send("modepasse 2 diffrente modepasse 3");
  user.name = name;
  user.lastname = lastname;
  user.password = pwd2;
  user.save();
});
router.post("/addSubject", async (req, res) => {
  const { subjectName, id_classe } = req.body;

  const newSubject = new Subject({
    subjectName: subjectName,
    id_classe: id_classe,
  });

  newSubject
    .save()
    .then(function () {
      console.log("Data added with success"); // Success
      res.status(200).json({ message: "Subject added successfully" });
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.status(500).json({ message: "Error adding subject" });
    });
});
router.get("/getAllSubject/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const subject = await Subject.find({ id_classe: id }).populate("id_classe");
    if (subject) {
      res.send(subject);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/deleteSubject/:id", async (req, res) => {
  let id = req.params.id;
  Subject.deleteOne({ _id: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
router.get("/getLavelById/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const level = await Level.findById(id);
    if (level) {
      res.send(level);
    } else {
      res.status(404).send("Level not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateLevel", async (req, res) => {
  const { levelName, year, _id } = req.body;

  try {
    const level = await Level.findById(_id);

    if (level) {
      level.levelName = levelName;
      level.year = year;
      await level.save();
      res.send(level);
    } else {
      res.status(404).send("Level not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Failed to update level: ${error.message}`);
  }
});
router.post("/AddEvent", uploadMiddleware.single("photo"), async (req, res) => {
  try {
    const { title, description, place, price, latitude, longitude } = req.body;

    const event = new Event({
      title: title,
      description: description,
      photo: req.file.filename,
      place: place,
      price: price,
      latitude: latitude,
      longitude: longitude,
    });

    const savedEvent = await event.save();
    res.status(200).send(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
router.get("/getallevent", async (req, res) => {
  try {
    const event = await Event.find({});
    if (event) {
      res.send(event);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/getalleventById/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.put(
  "/updateEvent/:id",
  uploadMiddleware.single("photo"),
  async (req, res) => {
    try {
      const { title, description, place, price, latitude, longitude } =
        req.body;
      console.log(price);
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
        title: title,
        description: description,
        photo: req.file.filename,
        place: place,
        price: price,
        latitude: latitude,
        longitude: longitude,
      });

      res.status(200).send(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);
router.delete("/deleteEvent/:id", async (req, res) => {
  let id = req.params.id;
  Event.deleteOne({ _id: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});
module.exports = router;
