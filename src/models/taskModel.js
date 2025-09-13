const { v4: uuidv4 } = require('uuid');

const tasks = [];

function getAllTasks() {
  return tasks;
}

function createTask(taskData) {
  const newTask = {
    id: uuidv4(),
    title: String(taskData.title).trim(),
    description: taskData.description ? String(taskData.description).trim() : '',
    userId: String(taskData.userId),
    dueDate: taskData.dueDate || null,
    completed: !!taskData.completed,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates, id };
  return tasks[idx];
}

function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
