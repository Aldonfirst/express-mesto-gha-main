const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, createCard);
router.delete('/:cardId', authMiddleware, deleteCard);
router.put('/:cardId/likes', authMiddleware, likeCard);
router.delete('/:cardId/likes', authMiddleware, dislikeCard);

module.exports = router;
