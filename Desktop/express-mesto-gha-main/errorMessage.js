module.exports.handleErrorMessage = (err, res) => {
  if (err.name === 'MessageError') {
    res.status(400)
      .send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(500).send({ message: err.message });
  }
};

module.exports.validationMessage = {
  required: 'Поле должно быть заполнено',
  minlength: 'Минимальная длина поля должна быть -2',
  maxlength: 'Максимальная длина поля должна быть -30',
};
