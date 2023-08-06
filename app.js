const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const { errors } = require('celebrate');
const { userSchema } = require('./middlewares/validateCelebrate');
const validateRequest = require('./middlewares/validateRequest');

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

app.use('/signup', validateRequest(userSchema), createUser);
app.use('/signin', login);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.use(errors);
app.use(errorHandler);
app.use(helmet());

app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
