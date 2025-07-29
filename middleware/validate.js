const { linkValidationSchema, userValidationSchema } = require('../config/joi');

module.exports.validateLink = () => {
  return (req, res, next) => {
    const { error } = linkValidationSchema.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      return res.redirect('/link/new'); 
    }
    next();
  };
};

module.exports.validateUser = () => {
  return (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      return res.redirect('/register');
    }
    next();
  };
};