const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TODO APP");
});

app.post("/createTodo", (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(403).json({
      msg: "you send wrong input",
    });
    return;
  }
});

app.get("/todos", (req, res) => {});

app.put("/completed", (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    res.status(403).json({
      msg: "you send wrong input",
    });
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000/`);
});
