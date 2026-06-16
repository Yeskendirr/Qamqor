const express = require('express');
const { db } = require('../db/database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const about = db.prepare('SELECT * FROM about ORDER BY id DESC LIMIT 1').get();
  res.json(about || {});
});

router.put('/', auth, (req, res) => {
  const { title, description, mission, vision, founded_year, team_count } = req.body;
  const existing = db.prepare('SELECT id FROM about').get();

  if (existing) {
    db.prepare(`
      UPDATE about SET title=?, description=?, mission=?, vision=?, founded_year=?, team_count=?, updated_at=CURRENT_TIMESTAMP
      WHERE id=?
    `).run(title, description, mission, vision, founded_year, team_count, existing.id);
  } else {
    db.prepare(`
      INSERT INTO about (title, description, mission, vision, founded_year, team_count) VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, description, mission, vision, founded_year, team_count);
  }

  res.json({ success: true });
});

module.exports = router;
