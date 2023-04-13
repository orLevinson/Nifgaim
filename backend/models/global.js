const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const globalSchema = new Schema({
  perm: [{ type: String }],
});

module.exports = mongoose.model("Global", globalSchema);
