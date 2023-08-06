const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const limiter = require('limiter');
const { errors } = require('celebrate');
const { authMiddleware } = require('./middlewares/auth');

const { validateSignUp, validateLogin } = require('./middlewares/validateCelebrate');

const { login, createUser } = require('./controllers/users');

const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(limiter);

app.use('/signup', validateSignUp, createUser);
app.use('/signin', validateLogin, login);

app.use(authMiddleware);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errors);
app.use(errorHandler);
app.use(helmet());

app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
