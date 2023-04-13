const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");

// this will give the user data based on the token withing the authorization header

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    //on app.js we allow the attach so the Authorization header
    const token = req.headers.authorization.split(" ")[1]; // Authorization : 'Bearer TOKEN' //split give an array of 2 values [Bearer,TOKEN]
    //scenario 2 -> we succeed but what ever we have in there doesnt give us any token

    if (!token) {
      throw new Error("Authentication failed!");
    }
    //process.env.JWT_KEY is taken from nodemon.json
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    let userData;

    userData = await User.findOne({ _id: decodedToken.id });

    if (!userData) {
      throw new Error("Authentication failed!");
    }

    req.userData = userData; //add data to the request object (the id is set on the login() and signUp())

    next(); // means that we succeed to get the token we are allow to continue with the  proccess
  } catch (err) {
    //scenario 1 -> authorization headers has not set at all and therefore split failes
    const error = new HttpError("Authentication failed", 403);
    next(error);
  }
};
