const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const { checkForGlobalDoc } = require("./middlewares/global-controller");

const globalRoutes = require("./routes/global-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

//Parse any incoming request body and extract any json data that is in there converted to regular javascript data structure (object,array...) and than call next autometically to reach the next middleware inline
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//FIX The CORS Error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// check if global exists
app.use(checkForGlobalDoc);

// routes
app.use("/api/perms", globalRoutes);
app.use("/api/users", usersRoutes);

// if none of the mentioned routes above were called
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handler
app.use((error, req, res, next) => {
  //this function will execute if any middleware Infront of it yields an error
  if (res.headerSent) {
    //check if respond already has been sent
    return next(error);
  }

  console.log(error);
  //if code properties is set or default 500 => error code that something went wrong
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
    success: !!error.success,
  });
});

mongoose
  //Procces.env is given from nodemon.json
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b0cnhuq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
