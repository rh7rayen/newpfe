module.exports = (app) => {
  app.use("/api/users", require("./users"));
  app.use("/api/users", require("./users"));
  app.use("/api/users", require("./users"));
  app.use("/api/adminController", require("./adminController"));

  app.use("/api/auth", require("./auth"));
  app.use("/api/auth/verifyuser/:activationcode", require("./auth"));
};
