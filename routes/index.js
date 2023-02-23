const AuthRouter = require("./auth");
const HomeRouter = require("./home");
const ProfileRouter = require("./profile");
const AdminRouter = require("./admin");
const QAMRouter = require("./qam");
const QARouter = require("./qa");
const idea = require("./idea");

function route(app) {
  app.use("/qa", QARouter);
  app.use("/qam", QAMRouter);
  app.use("/admin", AdminRouter);
  app.use("/profile", ProfileRouter);
  app.use("/auth", AuthRouter);
  app.use("/idea", idea);
  app.use("/", HomeRouter);
}

module.exports = route;
