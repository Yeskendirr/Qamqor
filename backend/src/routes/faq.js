const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const faqs = db.prepare('SELECT * FROM faq ORDER BY sort_order ASC, id ASC').all();
  res.json(faqs);
});

router.post('/', auth, (req, res) => {
  const { question, answer, sort_order } = req.body;
  const result = db.prepare(`
    INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)
  `).run(question, answer, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { question, answer, sort_order } = req.body;
  db.prepare(`
    UPDATE faq SET question=?, answer=?, sort_order=? WHERE id=?
  `).run(question, answer, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM faq WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
