const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rowScheme = new Schema(
  {
    perm: [
      {
        type: String,
      },
    ],
  },
  { strict: false, versionKey: false }
);

module.exports = mongoose.model("Row", rowScheme);
