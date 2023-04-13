const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt"); //hash a password
const jwt = require("jsonwebtoken"); //generate a token

const HttpError = require("../models/http-error");
const User = require("../models/user");

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { password, username } = req.body;

  let user;

  try {
    user = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError("logging in failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("logging in failed, please try again", 500);
    return next(error);
  }

  // comparing the password to the hashed version saved in the DB
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError("logging in failed, please try again", 500);
    return next(error);
  }

  // throw an error if the passowrd didnt match the hashed one in db
  if (!isValidPassword) {
    const error = new HttpError("logging in failed, please try again", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY, //process.env.JWT_KEY is taken from nodemon.json
      { expiresIn: "1w" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    success: true,
    token,
    name: user.name,
    id: user._id,
    perm: user.perm,
    isAdmin: user.isAdmin,
    canEdit: user.canEdit,
  });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, password, username, perm } = req.body;

  // check if a user with the same username has already registered
  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError("Registering failed, please try again", 500);
    return next(error);
  }

  if (!!user) {
    const error = new HttpError(
      "There is an existing user with the same username",
      500
    );
    return next(error);
  }

  // hashing the password to saved a hashed version of the password in the DB
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Registeration failed, please try again later.",
      500
    );
    return next(error);
  }

  // creating a new user object
  const newUser = new User({
    name,
    password: hashedPassword,
    username,
    perm,
    canEdit: false,
    isAdmin: false,
  });

  //saving user in DB
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      "Registeration failed, please try again later.",
      500
    );
    return next(error);
  }

  // returning a token to the user(just like in logging in)
  let token;
  try {
    token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_KEY, //process.env.JWT_KEY is taken from nodemon.json
      { expiresIn: "1w" }
    );
  } catch (err) {
    const error = new HttpError(
      "Registeration failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    success: true,
    token,
    name: newUser.name,
    id: newUser._id,
    perm: newUser.perm,
    isAdmin: newUser.isAdmin,
    canEdit: newUser.canEdit,
  });
};

const getUsers = async (req, res, next) => {
  let users = [];
  try {
    users = await User.find({}, "name _id perm isAdmin canEdit");
  } catch (err) {
    const error = new HttpError("getting users failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const patchUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const UserId = req.params.uid;

  const { name, canEdit, isAdmin, perm } = req.body;

  let user;

  try {
    user = await User.findOneAndUpdate(
      { _id: UserId },
      { $set: { name, canEdit, isAdmin, perm: perm.map(String) } }
    );
  } catch (err) {
    const error = new HttpError("Patching User failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Patching user failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    name,
    canEdit,
    isAdmin,
    perm: perm.map(String),
    id: user._id,
  });
};

const deleteUser = async (req, res, next) => {
  const UserId = req.params.uid;

  try {
    await User.deleteOne({ _id: UserId });
  } catch (err) {
    const error = new HttpError("Deleting User failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    message: "user has been deleted",
  });
};

exports.login = login;
exports.register = register;
exports.getUsers = getUsers;
exports.patchUser = patchUser;
exports.deleteUser = deleteUser;
