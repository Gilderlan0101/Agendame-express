const joi = require('joi');

const registerUser = joi.object({
  username: joi.string().alphanum().min(6).max(60).required(),

  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),

  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9](3,30)$')).required(),

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

  business_slug: joi.string().min(5).max(20),
});

module.exports = registerUser;
