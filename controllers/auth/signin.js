const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const {
  userFullField,
  dataFilter,
  ValidationError,
  UnauthorizedError,
} = require('../../helpers');

const signin = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    throw new ValidationError('Bad request (invalid request body)');
  }
  const user = await Users.findOne({ email });
  if (!user) throw new UnauthorizedError('Email or password is wrong');

  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword)
    throw new UnauthorizedError('Email or password is wrong');

  const payload = { id: user._id };
  const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '14d' });

  const result = await Users.findByIdAndUpdate(
    user._id,
    { authToken },
    { new: true },
  );
  // .select(selectUserElement);
  const newResult = dataFilter(result, userFullField);

  res.status(200).json({ code: 200, message: 'ok', data: newResult });
};

module.exports = signin;
