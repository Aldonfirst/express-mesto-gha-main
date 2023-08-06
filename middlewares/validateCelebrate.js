const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .default('Жак-Ив Кусто')
    .required(),
  about: Joi.string()
    .min(2)
    .max(30)
    .default('Исследователь')
    .required(),
  avatar: Joi.string()
    .pattern(/^(http|https):\/\/(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})(\/[a-zA-Z0-9]*)*$/)
    .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
    .required(),
  email: Joi.string()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

module.exports = {
  userSchema,
};
