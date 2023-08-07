// Мидлвэр для централизованной обработки ошибок
const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const ConflictError = require('../utils/errorsCatch/ConflictError');
const BadRequestError = require('../utils/errorsCatch/BadRequestError');
const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const ForbiddenError = require('../utils/errorsCatch/ForbiddenError');

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Внутренняя ошибка сервера';

  if (err instanceof BadRequestError) {
    status = 400;
    message = err.message || 'Некорректный _id пользователя';
  } else if (err instanceof NotFoundError) {
    status = 404;
    message = err.message || 'Объект не найден';
  } else if (err instanceof UnauthorizedError) {
    status = 401;
    message = err.message || 'Передан неверный логин или пароль';
  } else if (err instanceof ForbiddenError) {
    status = 403;
    message = err.message || 'Вы пытаетесь удалить чужую карточку';
  } else if (err instanceof ConflictError) {
    status = 409;
    message = err.message || 'При регистрации указан email, который уже существует';
  }

  res.status(status).json({ error: message });
  next(err);
};
module.exports = errorHandler;
