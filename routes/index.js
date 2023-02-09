const HomeRouter = require("./home");
const RoleRouter = require("./role");
const IdeaRouter = require("./idea");

function route(app) {
  app.use("/", HomeRouter);
  app.use("/roles", RoleRouter);
  app.use("/idea", IdeaRouter);
}

module.exports = route;
