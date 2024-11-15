const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

mongoose.connect("mongodb://localhost:27017/todo_app");

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  Todo,
};
