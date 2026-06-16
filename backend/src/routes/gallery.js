const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', (req, res) => {
  const photos = db.prepare('SELECT * FROM gallery ORDER BY uploaded_at DESC').all();
  res.json(photos);
});

router.post('/', auth, upload.single('image'), (req, res) => {
  const { title, category, image_url } = req.body;
  const url = req.file ? `/uploads/${req.file.filename}` : image_url;
  if (!url) return res.status(400).json({ error: 'Сурет немесе сілтеме қажет' });
  const result = db.prepare(`
    INSERT INTO gallery (title, image_url, category) VALUES (?, ?, ?)
  `).run(title || null, url, category || 'general');
  res.json({ id: result.lastInsertRowid, image_url: url });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM gallery WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
