const jwt = require('jsonwebtoken');
const { Users } = require('../models/user');
const { dataFilter, userMainField, UnauthorizedError } = require('../helpers');

const authMiddleware = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = '' } = req.headers;
  const [authType, token] = authorization.split(' ');

  if (authType !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById({ _id: id });
    (!user || user.authToken !== token) &&
      next(new UnauthorizedError('Not authorized'));
    const newUser = dataFilter(user, userMainField);
    req.user = newUser;
  } catch (error) {
    next(new UnauthorizedError('Not authorized'));
  }
  console.log('authorization ok');
  next();
};

module.exports = authMiddleware;
