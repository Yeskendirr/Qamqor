const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Токен жоқ' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Токен форматы қате' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ error: 'Токен жарамсыз немесе мерзімі өткен' });
  }
}

module.exports = authMiddleware;
