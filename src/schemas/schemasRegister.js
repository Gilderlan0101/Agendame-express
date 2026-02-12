// schemas/schemasRegister.js
const joi = require('joi');
const { DEFAULT_BUSINESS_HOURS } = require('../constants/businessDefaults');

const registerUser = joi.object({
  username: joi.string().min(6).max(60).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) // {3,30} em vez de (3,30)
    .required()
    .messages({
      'string.pattern.base':
        'Senha deve conter apenas letras e números, com 3 a 30 caracteres',
    }),
  business_name: joi.string().min(6).max(60).required(),
  business_type: joi
    .string()
    .valid(
      'salão',
      'estúdio',
      'pedicure',
      'barbearia',
      'spa',
      'clinica de estética',
      'tatuagem',
      'depilação',
    )
    .required(),
  phone: joi
    .string()
    .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
    .required(),
  whatsapp: joi
    .string()
    .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
    .required(),
  business_slug: joi.string().min(5).max(20).required(),

  // ADICIONE ESTE CAMPO - opcional, com default
  business_hours: joi
    .object({
      monday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      tuesday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      wednesday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      thursday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      friday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      saturday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
      sunday: joi.object({
        open: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
        close: joi
          .string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .allow(null),
      }),
    })
    .default(DEFAULT_BUSINESS_HOURS), // ← Default aqui
});

module.exports = {
  registerUser,
};
