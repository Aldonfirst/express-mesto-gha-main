const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');

const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true });

const app = express();

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
