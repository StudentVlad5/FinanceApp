const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
  SCH_ID: {
    type: Schema.Types.Mixed,
    required: true,
  },
  SCH_NAME: {
    type: String,
    required: [true, 'Назва рахунку обовʼязкова'],
    trim: true,
  },
  SCH_GROUP: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_CUR: {
    type: Schema.Types.Mixed,
    default: 980, // UAH за ISO
  },
  SCH_TYPE: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_VIEW: {
    type: Schema.Types.Mixed,
    default: 1,
  },
  SCH_DATE: {
    type: String,
    default: () => Date.now(),
  },
  SCH_VID: {
    type: Schema.Types.Mixed,
    default: '',
  },
  SCH_BANK_NAME: {
    type: String || String,
    default: '',
    trim: true,
  },
  SCH_KONTAKT_NAME: {
    type: String,
    default: '',
    trim: true,
  },
  SCH_KONTAKT_TEL: {
    type: String,
    default: '',
    trim: true,
  },
  SCH_KOL_AMORTIZ: {
    type: String,
    default: 0,
  },
  SCH_PROC: {
    type: String,
    default: 0,
  },
  SCH_PAYEE: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_TYPE_PROC: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_PERIOD: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_PERIOD_NACH_PROC: {
    type: Schema.Types.Mixed,
    default: 0,
  },
  SCH_DATE_CREDIT: {
    type: String,
    default: null,
  },
  SCH_KOM_MES: {
    type: String,
    default: '',
    trim: true,
  },
  SCH_W: {
    type: String,
    default: 0,
  },
  SCH_SUM: {
    type: String,
    default: 0,
  },
  SCH_MEMO: {
    type: String,
    default: '',
    trim: true,
  },
  SCH_CDATE: {
    type: String,
    default: null,
  },
  SCH_CSUM: {
    type: String,
    default: 0,
  },
  SCH_SYNC: {
    type: String,
    default: '',
    trim: true,
  },
  RE_TRANS_SCH_ID: {
    type: String,
    default: '',
    trim: true,
  },
  SCH_HIDE: {
    type: String,
    default: 'false',
  },
});

const Account = model('Account', accountSchema);

module.exports = Account;
