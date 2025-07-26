const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');
require('mongoose-type-url');

const userRegistationSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(13).required(),
  password: Joi.string().min(7).max(32),
});

const userValidationSchema = Joi.object({
  name: Joi.string().min(1).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32),
  phone: Joi.string().min(1).max(13).required(),
  avatar: Joi.string().uri(),
  favorites: Joi.array(),
  events: Joi.array(),
  role: Joi.string(),
});

const userUpdateValidationSchema = Joi.object({
  name: Joi.string().min(1).max(32),
  email: Joi.string().email(),
  phone: Joi.string().min(1).max(13),
  avatar: Joi.string().uri(),
  favorites: Joi.array(),
  events: Joi.array(),
  role: Joi.string(),
});

const userEditValidationSchema = Joi.object({
  name: Joi.string().min(1).max(32),
  email: Joi.string().email(),
  phone: Joi.string().min(1).max(13),
  avatar: Joi.string().uri(),
  favorites: Joi.array(),
  events: Joi.array(),
  role: Joi.string(),
});

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set user name'],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'Set email user'],
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone number'],
    },
    avatar: {
      type: mongoose.SchemaTypes.Url,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    authToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Users = mongoose.model('users', UsersSchema);

module.exports = {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
};
