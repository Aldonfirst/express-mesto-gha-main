const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const usersRouter = require('./userRoutes');
const cardsRouter = require('./cardsRoutes');

const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const { login, createUser } = require('../controllers/users');

const { validateSignUp, validateLogin } = require('../middlewares/validateCelebrate');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateLogin, login);

// мидлвара auth
router.use(authMiddleware);

router.get('/signout', (req, res) => {
  res.clearCookie('token').send({ message: 'Пользователь вышел из Аккаунта' });
});

router.use(usersRouter);
router.use(cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена 404 '));
});

module.exports = router;
