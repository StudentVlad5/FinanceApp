const { Schema, model } = require('mongoose');

const categnamesSchema = new Schema({
  CAT_ID: {
    type: Number,
    required: true,
  },
  CAT_TYPE: {
    type: Number,
    required: true,
    default: 0,
  },
  CAT_NUM: {
    type: Number,
    required: true,
    default: 0,
  },
  CAT_NDS: {
    type: Number,
    default: 0,
  },
  CAT_ID0: {
    type: Number,
    default: 0,
  },
  CAT_ID1: {
    type: Number,
    default: 0,
  },
  CAT_ID2: {
    type: Number,
    default: 0,
  },
  CAT_ID3: {
    type: Number,
    default: 0,
  },
  CAT_VIEW: {
    type: Number,
    default: 0,
  },
  CAT_COMMENT: {
    type: String,
    trim: true,
    default: '',
  },
  CAT_LIST: {
    type: String,
    trim: true,
    default: '',
  },
});

const CategNames = model('CategNames', categnamesSchema);

module.exports = CategNames;
