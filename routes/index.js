const { isLoggedIn } = require("../middlerwares/auth.middleware");
const HomeRouter = require("./home");
const RoleRouter = require("./role");
const IdeaRouter = require("./idea");
const ProfileRouter = require("./profile");
const AuthRouter = require("./auth");
const StaffRouter = require("./staff");

function route(app) {
  app.use("/", HomeRouter);
  app.use("/roles", RoleRouter);
  app.use("/idea", isLoggedIn, IdeaRouter);
  app.use("/profiles", ProfileRouter);
  app.use("/auth", AuthRouter);
  app.use("/staff", StaffRouter);
}

module.exports = route;
