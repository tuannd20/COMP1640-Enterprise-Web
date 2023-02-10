const HomeRouter = require("./home");
const RoleRouter = require("./role");
const IdeaRouter = require("./idea");
const ProfileRouter = require("./profile");

function route(app) {
  app.use("/", HomeRouter);
  app.use("/roles", RoleRouter);
  app.use("/idea", IdeaRouter);
  app.use("/profile", ProfileRouter);
}

module.exports = route;
