const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const events = db.prepare('SELECT * FROM events ORDER BY event_date DESC').all();
  res.json(events);
});

router.get('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM events WHERE id=?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Іс-шара табылмады' });
  res.json(item);
});

router.post('/', auth, (req, res) => {
  const { title, description, event_date, location, image_url } = req.body;
  const result = db.prepare(`
    INSERT INTO events (title, description, event_date, location, image_url) VALUES (?, ?, ?, ?, ?)
  `).run(title, description, event_date, location || null, image_url || null);
  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, description, event_date, location, image_url } = req.body;
  db.prepare(`
    UPDATE events SET title=?, description=?, event_date=?, location=?, image_url=? WHERE id=?
  `).run(title, description, event_date, location || null, image_url || null, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM events WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
