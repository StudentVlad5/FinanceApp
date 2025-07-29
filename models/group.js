const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
  SCHG_ID: {
    type: String || Number,
    required: true,
  },
  SCHG_NAME: {
    type: String,
    required: [true, 'Назва групи обовʼязкова'],
    trim: true,
  },
});

const Group = model('Group', groupSchema);

module.exports = Group;
