const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const routes = require("./routes");


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


nunjucks.configure("templates", {
    autoescape: true,
    express: app
  });
  
  app.use(routes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = (err.status || 500);

  // set the status and alert the user
  return res.render("error.html",{err});
});

module.exports = app;