const { Schema, model } = require('mongoose');

const currencySchema = new Schema({
  CUR_ID: {
    type: String,
    required: true,
  },
  CUR_SHOT_NAME: {
    type: String,
    required: [true, 'Скорочена назва обовʼязкова'],
    trim: true,
  },
  CUR_NAME: {
    type: String,
    required: [true, 'Повна назва обовʼязкова'],
    trim: true,
  },
  CUR_SHOT_NAME_US: {
    type: String,
    required: [true, "Скорочення для відображення обов'язкове"],
    default: '',
  },
  CUR_VIEW: {
    type: String,
    default: 0,
  },
  CUR_TYPE: {
    type: String,
    default: '',
    trim: true,
  },
  CUR_LOW: {
    type: String,
    default: '',
    trim: true,
  },
  CUR_HIGH: {
    type: String,
    default: '',
    trim: true,
  },
  CUR_UPDATE: {
    type: String,
    default: '',
    trim: true,
  },
  CUR_ACTIVE: {
    type: Boolean,
    default: false,
    trim: true,
  },
});

const Currency = model('Currency', currencySchema);

module.exports = Currency;
