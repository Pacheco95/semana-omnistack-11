const { celebrate, Segments, Joi } = require('celebrate');

const bounds = require('../config/bounds.json').tables.incidents.fields;

module.exports = {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().positive()
    })
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(bounds.title.length.max),
      description: Joi.string().required().max(bounds.description.length.max),
      value: Joi.string().required().max(bounds.value.range.max)
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required().positive()
    })
  })
}