const jwt = require('jsonwebtoken');
const { CustomError } = require('./errorHandler');
const { SECRET_KEY } = require('../utils/constants');

function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    throw new CustomError('Требуется авторизация', 401);
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware,
};
