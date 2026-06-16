const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM projects WHERE id=?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Жоба табылмады' });
  res.json(item);
});

router.post('/', auth, (req, res) => {
  const { title, description, status, image_url, start_date, end_date, beneficiaries } = req.body;
  const result = db.prepare(`
    INSERT INTO projects (title, description, status, image_url, start_date, end_date, beneficiaries)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(title, description, status || 'active', image_url || null, start_date || null, end_date || null, Number(beneficiaries) || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, description, status, image_url, start_date, end_date, beneficiaries } = req.body;
  db.prepare(`
    UPDATE projects SET title=?, description=?, status=?, image_url=?, start_date=?, end_date=?, beneficiaries=? WHERE id=?
  `).run(title, description, status, image_url || null, start_date || null, end_date || null, Number(beneficiaries) || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM projects WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
