const { ValidationError } = require('../helpers');

const validation = schema => {
  return (req, res, next) => {
    console.log('validation req.query: ', req.query);
    console.log('validation req.query req.body: ', req.body);
    const dataValidate =
      Object.keys(req.query).length > 0 ? req.query : req.body;
    console.log('dataValidate: ', dataValidate);
    const { error } = schema.validate(dataValidate);
    if (error) {
      throw new ValidationError(error.message);
    }
    next();
    // return true;
  };
};

module.exports = { validation };