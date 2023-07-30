const mongoose = require('mongoose');
const User = require('../models/user');
const { handleErrorMessage } = require('../utils/errorMessage');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json({ data: users }))
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Пользователь по указанному _id не найден.' });
        }
        return res.status(200).json({ data: user });
      })
      .catch((err) => handleErrorMessage(err, res));
  } else {
    res.status(400).json({ message: 'Неверный Id' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json({ data: user }))
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.json({ data: updatedUser });
    })
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send({ data: updatedUser });
    })
    .catch((err) => handleErrorMessage(err, res));
};
