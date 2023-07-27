const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Успешное подключение к MongoDB!');
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/cards', cardsRouter);
app.use(usersRouter);

app.use((req, _res, next) => {
  req.user = {
    _id: '64c26a5b49108a0730f64cf4',
  };

  next();
});

app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
