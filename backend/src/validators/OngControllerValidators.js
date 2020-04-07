const { celebrate, Segments, Joi } = require('celebrate');

const bounds = require('../config/bounds.json').tables.ongs.fields;

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().max(bounds.name.length.max),
      password: Joi.string().required().min(bounds.password.length.min).max(bounds.password.length.max),
      email: Joi.string().required().email().max(bounds.email.length.max),
      whatsapp: Joi.string().required().min(bounds.whatsapp.length.min).max(bounds.whatsapp.length.max),
      city: Joi.string().required(),
      uf: Joi.string().required().min(bounds.uf.length.min).max(bounds.uf.length.max)
    })
  })
}