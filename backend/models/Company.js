const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  type: { type: String, required: true },
  companyName: { type: String, required: true },
  purpose: { type: String, required: true },
  logo: { type: String, required: true },
  video: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
