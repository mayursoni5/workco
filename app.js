const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TODO APP");
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(403).json({
      msg: "you send wrong input",
    });
    return;
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  console.log(createPayload.title, "is added");

  res.json({
    msg: "Todo has created",
  });
});

app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find({});

  res.json({
    todos: allTodos,
  });
});

app.post("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    res.status(403).json({
      msg: "you send wrong input",
    });
    return;
  }

  await Todo.updateOne(
    { _id: req.body.id },
    {
      completed: true,
    }
  );

  const todo = await Todo.findOne({
    _id: req.body.id,
  });

  console.log(todo.title, "is completed");

  res.send("todo completed");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000/`);
});
