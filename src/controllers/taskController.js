const taskModel = require('../models/taskModel');

function listTasks(_req, res) {
  res.json({ data: taskModel.getAllTasks() });
}

function createTask(req, res) {
  const { title, description, userId, dueDate } = req.body || {};
  if (!title || !userId) {
    return res.status(400).json({ error: 'Missing required fields: title or userId' });
  }
  const created = taskModel.createTask({ title, description, userId, dueDate });
  res.status(201).json({ data: created });
}

function updateTask(req, res) {
  const { id } = req.params;
  const updated = taskModel.updateTask(id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json({ data: updated });
}

function deleteTask(req, res) {
  const { id } = req.params;
  const ok = taskModel.deleteTask(id);
  if (!ok) return res.status(404).json({ error: 'Task not found' });
  res.status(204).end();
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
