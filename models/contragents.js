const { Schema, model } = require('mongoose');

const contragentsSchema = new Schema({
  PAYEE_ID: {
    type: Number,
    required: true,
  },
  PAYEE_HIDE: {
    type: Number,
    default: 0,
  },
  PAYEE_NAME: {
    type: String,
    required: [true, 'Назва контрагенту обовʼязкова'],
    trim: true,
  },
  PAYEE_ADRES: {
    type: String,
    trim: true,
    default: '',
  },
  PAYEE_CITY: {
    type: String,
    trim: true,
    default: '',
  },
  PAYEE_TEL: {
    type: String,
    trim: true,
    default: '',
  },
  PAYEE_SITE: {
    type: String,
    trim: true,
    default: '',
  },
  PAYEE_KOMENT: {
    type: String,
    trim: true,
    default: '',
  },
  PAYEE_CON_ID: {
    type: String,
    trim: true,
    default: '',
  },
});

const Contragents = model('Contragents', contragentsSchema);

module.exports = Contragents;
