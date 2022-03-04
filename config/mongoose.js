const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo_DB");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in your mongodb databse"));

db.once("open", function () {
  console.log("Database created successfully and connected ");
});

module.exports = db;
