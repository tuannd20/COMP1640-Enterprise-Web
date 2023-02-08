const HomeRouter = require("./home");
const RoleRouter = require("./role");

function route(app) {
  app.use("/", HomeRouter);
  app.use("/roles", RoleRouter);
}

module.exports = route;
