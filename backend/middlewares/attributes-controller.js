const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Attribute = require("../models/attribute");

const getAttributes = async (req, res, next) => {
  let attributes = [];
  try {
    attributes = await Attribute.find({});
  } catch (err) {
    const error = new HttpError(
      "getting attributes failed, please try again",
      500
    );
    return next(error);
  }

  res.json({
    success: true,
    attributes: attributes.map((a) => a.toObject({ getters: true })),
  });
};

const addAttribute = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { number } = req.body;
  const documents = [];

  // Create the specified number of documents
  for (let i = 0; i < number; i++) {
    documents.push({
      name: "שם",
      type: "text",
      children: [],
      options: [],
      width: "big",
    });
  }

  const idArr = [];

  try {
    const documentsArr = await Attribute.insertMany(documents);
    documentsArr.forEach((doc) => {
      idArr.push(doc._id);
    });
  } catch (err) {
    // Handle any errors that occur during document creation
    const error = new HttpError(
      "creating attributes failed, please try again",
      500
    );
    return next(error);
  }

  // Return the array of created document IDs
  return res.json({ success: true, idArr });
};
const changeAttribute = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, type, children, options, width } = req.body;
  const attributeId = req.params.aid;

  let attribute;
  try {
    attribute = await Attribute.findOneAndUpdate(
      { _id: attributeId },
      {
        $set: {
          name: name !== "" && !!name ? name : " ",
          type,
          children,
          options: options.map(String),
          width,
        },
      },
      { new: true } // return the updated document
    ).lean(); // convert Mongoose document to plain JavaScript object
  } catch (err) {
    const error = new HttpError(
      "Changing attributes failed, please try again",
      500
    );
    return next(error);
  }

  res.json({
    success: true,
    attribute,
  });
};
const deleteAttribute = async (req, res, next) => {
  const attributeId = req.params.aid;

  try {
    await Attribute.deleteOne({ _id: attributeId });
  } catch (err) {
    const error = new HttpError(
      "Deleting Attribute failed, please try again",
      500
    );
    return next(error);
  }

  res.json({
    success: true,
    message: "Attribute has been deleted",
  });
};

exports.getAttributes = getAttributes;
exports.addAttribute = addAttribute;
exports.changeAttribute = changeAttribute;
exports.deleteAttribute = deleteAttribute;
