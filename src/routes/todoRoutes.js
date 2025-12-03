const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

// GET /todos - 모든 할 일 가져오기
router.get("/", async (req, res) => {
  try {
    const todos = await prisma.todos.findMany();
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos - 새로운 할 일 추가
router.post("/", async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: "Title and date are required" });
  }
  try {
    const newTodo = await prisma.todos.create({
      data: { title, date: new Date(date), completed: false },
    });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH /todos/:id/toggle - 할 일 완료 상태 토글
router.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todos.findUnique({ where: { id: parseInt(id) } });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const updatedTodo = await prisma.todos.update({
      where: { id: parseInt(id) },
      data: { completed: !todo.completed },
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error("Error toggling todo:", err);
    res.status(500).json({ error: "Failed to toggle todo" });
  }
});

// DELETE /todos/:id - 할 일 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todos.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;