class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = 'Ошибка на стороне сервера';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  if (err.code === 11000) {
    statusCode = 409;
    errorMessage = 'При регистрации указан email, который уже существует';
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorMessage = 'Передан неверный логин или пароль';
  }
  if (statusCode === 404) {
    errorMessage = 'Объект с указанным _id не найден';
  }
  res.status(statusCode).json({
    error: errorMessage,
  });
  if (!res.headersSent) {
    next();
  }
};

module.exports = errorHandler;
