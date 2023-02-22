const path = require("path");
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
require("dotenv").config();

const database = require("./database/connection");

const route = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "comp1640-key-session",
    resave: false,
    saveUninitialized: true,
  }),
);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// override using a query value
app.use(methodOverride("_method"));

route(app);

console.log(`Server listening on port: ${process.env.PORT}`);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

(async () => {
  await database.connectionDatabase();
})();

module.exports = app;
