const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.post('/register', (req, res) => {
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
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = userModel.findByCredentials(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ data: { id: user.id, email: user.email, firstName: user.firstName } });
});

router.post('/recover', (_req, res) => {
  res.json({ message: 'If the email exists, a recovery link was sent.' });
});

module.exports = router;
