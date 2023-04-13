const express = require("express");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");

const canEdit = (req, res, next) => {
  const { userData } = req;

  if (userData && (userData.canEdit || userData.isAdmin)) {
    next();
  } else {
    const error = new HttpError(
      "You are not authorized to preform this action",
      401
    );
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  const { userData } = req;

  if (userData && userData.isAdmin) {
    next();
  } else {
    const error = new HttpError(
      "You are not authorized to preform this action",
      401
    );
    return next(error);
  }
};

exports.canEdit = canEdit;
exports.isAdmin = isAdmin;
