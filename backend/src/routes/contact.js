const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Аты, email және хабарлама міндетті' });
  }
  db.prepare(`
    INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)
  `).run(name, email, subject || null, message);
  res.json({ success: true, message: 'Хабарламаңыз жіберілді. Жақында хабарласамыз!' });
});

router.get('/', auth, (req, res) => {
  const messages = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(messages);
});

router.put('/:id/read', auth, (req, res) => {
  db.prepare('UPDATE contacts SET is_read=1 WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
