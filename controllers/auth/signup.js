const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const {
  dataFilter,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require('../../helpers');

const signup = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  console.log('SECRET_KEY', SECRET_KEY);
  try {
    console.log('req.body', req.body);

    const isValidInData = checkObjByList(req.body, requiredSignUpFields);
    if (!isValidInData) {
      throw new ValidationError('Bad request, invalid data');
    }

    const userDataCreate = dataFilter(req.body, requiredSignUpFields);

    const isFoundUser = await Users.findOne(
      { email: userDataCreate.email },
      'email',
    );
    if (isFoundUser) {
      throw new DuplicateEmailError(
        `Email: ${userDataCreate.email} already registered`,
      );
    }

    // Hash the password
    userDataCreate.password = bcrypt.hashSync(userDataCreate.password, 10);

    // Create the user
    const user = await Users.create(userDataCreate);

    // Create JWT token
    const payload = { id: user._id };
    const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '14d' });

    // Save token to user
    const result = await Users.findByIdAndUpdate(
      user._id,
      { authToken },
      { new: true },
    );

    // Filter response fields (optional)
    const userFullField = ['_id', 'email', 'name', 'authToken']; // or whatever fields you want
    const newResult = dataFilter(result, userFullField);

    res.status(201).json({ message: 'Create success', data: newResult });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
