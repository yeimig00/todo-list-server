const userModel = require('../models/userModel');

function listUsers(_req, res) {
  res.json({ data: userModel.getAllUsers() });
}

function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, age } = req.body || {};
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const created = userModel.createUser({ firstName, lastName, email, password, age });
    res.status(201).json({ data: created });
  } catch (err) {
    if (err.code === 'EMAIL_TAKEN') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Internal error' });
  }
}

module.exports = { listUsers, createUser };
