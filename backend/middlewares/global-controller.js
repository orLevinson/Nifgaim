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
      perm: [],
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
    perm: global.perm,
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

  global.perm = req.body.perm.map(String);

  try {
    await global.save();
  } catch (err) {
    const error = new HttpError("unknown error occured", 500);
    return next(error);
  }

  res.json({
    success: true,
    perm: global.perm,
  });
};

exports.checkForGlobalDoc = checkForGlobalDoc;
exports.getPerms = getPerms;
exports.postPerms = postPerms;
