require("dotenv").config();
require("./config/database").connect();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var fileUpload = require("express-fileupload");

var APIRouter = require("./routes/api");

var app = express();

//carga de archivos

app.get("/loadfile", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(fileUpload());

//Configuración de entorno

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// enabling CORS for all requests
app.use(cors());

app.use("/api", APIRouter);

// mensaje de Error 
app.use(function (req, res, next) {
  next(createError(404));
});
  
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
