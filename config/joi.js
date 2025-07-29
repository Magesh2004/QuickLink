const Joi = require('joi');

const linkValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  category: Joi.string()
    .valid(
      'Personal Document',
      'Land & Property',
      'Vehicle & Transport',
      'Bill & utilities',
      'Goverment Scheme & Welface',
      'Money & banking',
      'Police & Legal',
      'Employment & skill develpment',
      'Education & student services'
    )
    .required(),
  link: Joi.string().uri().required()
});

const userValidationSchema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = {
  linkValidationSchema,
  userValidationSchema
};
