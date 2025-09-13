const { v4: uuidv4 } = require('uuid');

const users = [];

function getAllUsers() {
  return users;
}

function createUser({ firstName, lastName, email, password, age }) {
  const exists = users.find(u => u.email === String(email).toLowerCase().trim());
  if (exists) {
    const err = new Error('Email already registered');
    err.code = 'EMAIL_TAKEN';
    throw err;
  }

  const u = {
    id: uuidv4(),
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: String(email).toLowerCase().trim(),
    password: String(password),
    age: age || null,
    createdAt: new Date().toISOString()
  };
  users.push(u);
  return u;
}

function findByCredentials(email, password) {
  const e = String(email || '').toLowerCase().trim();
  const p = String(password || '');
  return users.find(u => u.email === e && u.password === p) || null;
}

module.exports = { getAllUsers, createUser, findByCredentials };
