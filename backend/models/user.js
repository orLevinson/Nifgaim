const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    canEdit: { type: Boolean, require: true },
    isAdmin: { type: Boolean, required: true },
    perm: [{ type: String }],
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
