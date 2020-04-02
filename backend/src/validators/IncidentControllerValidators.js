const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().positive()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required().positive()
    })
  })
}