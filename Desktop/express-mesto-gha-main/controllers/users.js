const User = require('../models/user');
const { handleErrorMessage } = require('../errorMessage');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ data: user });
    })
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send(updatedUser);
    })
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(updatedUser);
    })
    .catch((err) => handleErrorMessage(err, res));
};
