const { Schema, model } = require('mongoose');

const contragentsSchema = new Schema({
  CAT0_ID: {
    type: Number,
    required: true,
  },
  CAT0_NAME: {
    type: String,
    required: [true, 'Назва контрагенту обовʼязкова'],
    trim: true,
  },
});

const Contragents = model('Contragents', contragentsSchema);

module.exports = Contragents;
