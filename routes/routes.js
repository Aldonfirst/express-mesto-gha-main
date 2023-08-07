const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo, login, createUser,
} = require('../controllers/users');

const {
  validateSignUp, validateLogin, validateUpdateProfile,
  validateUpdateAvatar, validateUserId, validateCardId,
  validateCreateCard,
} = require('../middlewares/validateCelebrate');

// --------------роуты регистрации и авторизации----
router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateLogin, login);

// мидлвара auth
router.use(authMiddleware);

// -----------роуты юзера------------
router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateProfile, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

// -----------роуты карточек---------
router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена 404 '));
});

module.exports = router;
