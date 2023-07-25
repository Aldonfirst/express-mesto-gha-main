const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { PORT, DB_URL } = require('./utils/constants');

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
    _id: '64bea5d245134caf3b614212',
  };

  next();
});

app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
