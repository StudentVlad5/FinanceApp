const { Schema, model } = require("mongoose");

const accountSchema = new Schema({
  SCH_ID: {
    type: Number,
    required: true
  },
  SCH_NAME: {
    type: String,
    required: [true, 'Назва рахунку обовʼязкова'],
    trim: true
  },
  SCH_GROUP: {
    type: Number,
    default: 0
  },
  SCH_CUR: {
    type: Number,
    default: 980  // UAH за ISO
  },
  SCH_TYPE: {
    type: Number,
    default: 0
  },
  SCH_VIEW: {
    type: Number,
    default: 1
  },
  SCH_DATE: {
    type: Date,
    default: () => Date.now()
  },
  SCH_VID: {
    type: Number,
    default: 0
  },
  SCH_BANK_NAME: {
    type: String,
    default: '',
    trim: true
  },
  SCH_KONTAKT_NAME: {
    type: String,
    default: '',
    trim: true
  },
  SCH_KONTAKT_TEL: {
    type: String,
    default: '',
    trim: true
  },
  SCH_KOL_AMORTIZ: {
    type: Number,
    default: 0
  },
  SCH_PROC: {
    type: Number,
    default: 0
  },
  SCH_PAYEE: {
    type: Number,
    default: 0
  },
  SCH_TYPE_PROC: {
    type: Number,
    default: 0
  },
  SCH_PERIOD: {
    type: Number,
    default: 0
  },
  SCH_PERIOD_NACH_PROC: {
    type: Number,
    default: 0
  },
  SCH_DATE_CREDIT: {
    type: Date,
    default: null
  },
  SCH_KOM_MES: {
    type: String,
    default: '',
    trim: true
  },
  SCH_W: {
    type: Number,
    default: 0
  },
  SCH_SUM: {
    type: Number,
    default: 0
  },
  SCH_MEMO: {
    type: String,
    default: '',
    trim: true
  },
  SCH_CDATE: {
    type: Date,
    default: null
  },
  SCH_CSUM: {
    type: Number,
    default: 0
  },
  SCH_SYNC: {
    type: String,
    default: '',
    trim: true
  },
  SCH_HIDE: {
    type: Boolean,
    default: false
  }
});

const Account = model("Account", accountSchema);

module.exports = Account;

