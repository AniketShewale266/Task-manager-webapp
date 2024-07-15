import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(bodyParser.json());

const tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  task.id = crypto.randomUUID();
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...updatedTask, id };
    res.json(tasks[index]);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Task not found");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
