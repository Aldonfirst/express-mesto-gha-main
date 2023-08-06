const jwt = require('jsonwebtoken');
const { CustomError } = require('./errorHandler');

function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    throw new CustomError('Требуется авторизация', 401);
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, 'secret');
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware,
};
