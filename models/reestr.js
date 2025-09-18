const { Schema, model } = require('mongoose');
const reestrSchema = new Schema({
  RE_ID: {
    type: Number,
    required: true,
  },
  RE_SCH_ID: {
    type: Number,
    required: [true, 'Назва рахунку обовʼязкова'],
  },
  RE_DATE: {
    type: String,
    default: '',
  },
  RE_KOMENT: {
    type: String,
    default: '',
  },
  RE_PAYE_ID: {
    type: Number,
    default: 0,
  },
  RE_CAT_ID: {
    type: Number,
    default: 1,
  },
  RE_MONEY: {
    type: String,
    default: '0',
  },
  RE_SUM: {
    type: String,
    default: '',
  },
  RE_INCR: {
    type: Number,
    default: 0,
  },
  RE_TRANS_RE: {
    type: Number,
    default: 0,
  },
  RE_TRANS_SCH_ID: {
    type: Number,
    default: 0,
  },
  RE_KURS: {
    type: Schema.Types.Mixed,
    default: 1,
  },
  RE_TAG: {
    type: String,
    default: '',
  },
  RE_KVO: {
    type: String,
    default: '',
  },
  RE_TAS_ID: {
    type: Number,
    default: 0,
  },
  RE_CLEAR: {
    type: Number,
    default: 0,
  },
  RE_USER: {
    type: String,
    default: '',
  },
  RE_ATTACH: {
    type: String,
    default: '',
  },
});

const Reestr = model('Reestr', reestrSchema);

module.exports = Reestr;
