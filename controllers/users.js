const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/constants');
const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const ConflictError = require('../utils/errorsCatch/ConflictError');
const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  if (mongoose.Types.ObjectId.isValid(userId)) {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь не найден');
        }
        return res.json(user);
      })
      .catch((err) => next(err));
  }
};
// регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({
    name, about, avatar, email, password: hashedPassword,
  })
    .then(() => res.status(201).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError('Пользователь с таким Email уже зарегистрирован'));
      }
      return next(err);
    });
};
// авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedError('Ошибка при авторизации пользователя');
      }
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { httpOnly: true })
        .send({ token });
    })
    .catch((err) => next(err));
};
// users/me возврат пользователя
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => next(err));
};
