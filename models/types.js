const { Schema, model } = require('mongoose');

const typesSchema = new Schema({
  TPSCH_ID: {
    type: String || Number,
    required: true,
  },
  TPSCH_NAME: {
    type: String,
    required: [true, 'Назва типу обовʼязкова'],
    trim: true,
  },
});

const Types = model('Types', typesSchema);

module.exports = Types;
