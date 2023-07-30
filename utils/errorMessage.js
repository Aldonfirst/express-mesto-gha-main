const handleErrorMessage = (err, res) => {
  if (err.name === 'ValidtionError') {
    res.status(400)
      .send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(500).send({ message: err.message });
  }
};

const validationMessage = {
  required: 'Поле должно быть заполнено',
  minlength: 'Минимальная длина поля должна быть от 2 до 30 символов',
  maxlength: 'Максимальная длина поля должна быть от 2 до 30 символов',
};

module.exports = {
  validationMessage,
  handleErrorMessage,
};
