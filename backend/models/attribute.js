const mongoose = require("mongoose");

const subAttributeScheme = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "multi-row", "select", "date"],
    required: true,
  },
  options: [String],
  width: {
    type: String,
    enum: ["big", "medium", "small"],
  },
});

const attributeScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "multi-row", "select", "date", "multi-attributes"],
      required: true,
    },
    children: [subAttributeScheme],
    options: [String],
    width: {
      type: String,
      enum: ["big", "medium", "small"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Attribute", attributeScheme);
