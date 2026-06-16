const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const news = db.prepare('SELECT * FROM news WHERE is_published=1 ORDER BY published_at DESC').all();
  res.json(news);
});

router.get('/admin/all', auth, (req, res) => {
  const news = db.prepare('SELECT * FROM news ORDER BY published_at DESC').all();
  res.json(news);
});

router.get('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM news WHERE id=? AND is_published=1').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Жаңалық табылмады' });
  res.json(item);
});

router.post('/', auth, (req, res) => {
  const { title, content, excerpt, image_url, is_published } = req.body;
  const result = db.prepare(`
    INSERT INTO news (title, content, excerpt, image_url, is_published) VALUES (?, ?, ?, ?, ?)
  `).run(title, content, excerpt || null, image_url || null, Number(is_published ?? 1));
  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, content, excerpt, image_url, is_published } = req.body;
  db.prepare(`
    UPDATE news SET title=?, content=?, excerpt=?, image_url=?, is_published=? WHERE id=?
  `).run(title, content, excerpt || null, image_url || null, Number(is_published ?? 1), req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM news WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
