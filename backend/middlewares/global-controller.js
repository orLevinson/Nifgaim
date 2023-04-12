const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Global = require("../models/global");

const checkForGlobalDoc = async (req, res, next) => {
  let global;
  try {
    global = await Global.find();
  } catch (err) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }
  if (!global || global.length === 0) {
    const globalDoc = new Global({
      perms: [],
    });
    try {
      await globalDoc.save();
    } catch (err) {
      const error = new HttpError("unknown error occured", 500);
      return next(error);
    }
  }
  next();
};

const getPerms = async (req, res, next) => {
  let global;
  try {
    global = await Global.findOne();
  } catch (err) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  if (!global) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  res.json({
    success: true,
    perms: global.perms,
  });
};

const postPerms = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let global;
  try {
    global = await Global.findOne();
  } catch (err) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  if (!global) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  global.perms = req.body.perms.map(String);

  try {
    await global.save();
  } catch (err) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  res.json({
    success: true,
    perms: global.perms,
  });
};

exports.checkForGlobalDoc = checkForGlobalDoc;
exports.getPerms = getPerms;
exports.postPerms = postPerms;
