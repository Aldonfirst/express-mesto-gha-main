const Card = require('../models/card');
const { CustomError } = require('../middlewares/errorHandler');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => next(err));
};

// module.exports.deleteCard = (req, res) => {
//   Card.findByIdAndDelete(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
//       }
//       return res.send(card);
//     })
//     .catch((err) => handleErrorMessage(err, res));
// };
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new CustomError(404);
      } else if (card.owner.toString() !== req.user._id) {
        res.status(403).send({ message: 'Нет прав для удаления карточки' });
      } else {
        Card.findByIdAndRemove(cardId)
          .then((removedCard) => {
            res.send({ message: 'Карточка удалена', card: removedCard });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new CustomError(404);
      }
      return res.send(card);
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new CustomError(404);
      }
      return res.send(card);
    })
    .catch((err) => next(err));
};
