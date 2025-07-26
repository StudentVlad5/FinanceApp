const userMainField = [
  '_id',
  'name',
  'email',
  'password',
  'phone',
  'avatar',
  'role',
  'authToken',
];

const userFullField = [
  '_id',
  'name',
  'email',
  // "password",
  'phone',
  'avatar',
  'role',
  'events',
  'authToken',
];

const userFieldReceivedFromFront = [
  'name',
  'email',
  'password',
  'phone',
  'avatar',
  'role',
];

const requiredSignUpFields = ['name', 'password', 'email', 'phone'];

module.exports = {
  userMainField,
  userFullField,
  userFieldReceivedFromFront,
  requiredSignUpFields,
};
