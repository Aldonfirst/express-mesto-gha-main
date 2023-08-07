const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const { SECRET_KEY } = require('../utils/constants');

function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
  } catch (err) {
    if (err.message === 'JsonWebTokenError' || err.message === 'TokenExpiredError') {
      throw new UnauthorizedError('Невалидный токен или истек срок его действия');
    } else {
      throw new UnauthorizedError(err.message);
    }
  }
  next();
}

module.exports = {
  authMiddleware,
};
