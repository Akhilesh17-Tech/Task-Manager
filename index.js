const express = require("express");
const port = 8000;
const path = require("path");

// setup mongoDB 
const db = require("./config/mongoose");

// schema define in mongoDB
const toDOs = require("./models/todo_list");

const app = express();

// set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static file path set up using built in middleware
app.use(express.static("assets"));

app.use(express.urlencoded());

var todoList = [
  {
    task: " get vegitable from the market",
    date: "25-05-2021",
    categ: "School",
  },
  {
    task: "complete task before 1 january",
    date: "25-05-2021",
    categ: "College",
  },
];

app.get("/", function (req, res) {
  toDOs.find({}, function (err, tasks) {
    if (err) {
      console.log(`error in fetching data from the database : ${err}`);
      return;
    }
    return res.render("todo", { title: "TODO APP", todoList: tasks });
  });
});

app.post("/create-task", function (req, res) {
  toDOs.create(
    {
      task: req.body.tasks,
      date: req.body.dates,
      categ: req.body.options,
    },
    function (error, newTask) {
      if (error) {
        console.log("error in creating the task ", error);
        return;
      }
      console.log("new task has been created = ", newTask);
    }
  );

  todoList.push(req.body);
  return res.redirect("back");
});

app.get("/delete", function (req, res) {
  var id = req.query;
  var count = Object.keys(id).length;

  for (let i = 0; i < count; i++) {
    toDOs.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("Failed to delete");
        return;
      }
    });
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log(` Error in your express server : ${err}`);
    return;
  }
  console.log(`Express server is running fine on port : ${port}`);
});
