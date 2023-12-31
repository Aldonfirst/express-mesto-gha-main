const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardId, validateCreateCard } = require('../middlewares/validateCelebrate');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
