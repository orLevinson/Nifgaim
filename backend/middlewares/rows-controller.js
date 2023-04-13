const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Row = require("../models/row");

const getRows = async (req, res, next) => {
  // will get to this middleware after checking if canEdit = true
  const { perm, isAdmin } = req.userData;

  let filter = isAdmin ? {} : { perm: { $in: perm } };
  let rows = [];
  try {
    rows = await Row.find(filter);
  } catch (err) {
    const error = new HttpError("fetching rows failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    rows: rows.map((row) => row.toObject({ getters: true })).reverse(),
  });
};

const addRows = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { number } = req.body;
  const { perm } = req.userData;
  const documents = [];

  // Create the specified number of documents
  for (let i = 0; i < number; i++) {
    documents.push({
      perm: perm.map(String),
    });
  }

  const idArr = [];

  try {
    const documentsArr = await Row.insertMany(documents);
    documentsArr.forEach((doc) => {
      idArr.push(doc._id);
    });
  } catch (err) {
    // Handle any errors that occur during document creation
    const error = new HttpError("creating rows failed, please try again", 500);
    return next(error);
  }

  // Return the array of created document IDs
  return res.json({ success: true, idArr });
};

const changeRow = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { perm, ...additionalAttributes } = req.body;
  const { perm: userPerm, isAdmin } = req.userData;
  const rowId = req.params.rid;

  filter = isAdmin ? { _id: rowId } : { _id: rowId, perm: { $in: userPerm } };

  let row;
  try {
    row = await Row.findOneAndUpdate(
      filter,
      { perm, $set: additionalAttributes },
      { new: true } // return the updated document
    );
  } catch (err) {
    const error = new HttpError("Changing row failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    row: row ? row.toObject({ getters: true }) : row,
  });
};

const deleteRow = async (req, res, next) => {
  const { perm, isAdmin } = req.userData;
  const rowId = req.params.rid;

  filter = isAdmin ? { _id: rowId } : { _id: rowId, perm: { $in: perm } };

  try {
    await Row.deleteOne(filter);
  } catch (err) {
    const error = new HttpError("Deleting Row failed, please try again", 500);
    return next(error);
  }

  res.json({
    success: true,
    message: "Row has been deleted",
  });
};

exports.getRows = getRows;
exports.addRows = addRows;
exports.changeRow = changeRow;
exports.deleteRow = deleteRow;
