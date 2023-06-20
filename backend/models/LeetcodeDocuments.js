const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  inputs: Object,
  expectedOutput: Array,
});

const problemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  examples: Array,
  constraints: Array,
  code: String,
  testCases: [testCaseSchema],
});

// Specify the collection as "demo"
module.exports = mongoose.model("Problem", problemSchema, "demo");
