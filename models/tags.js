const { Schema, model } = require('mongoose');

const tagsSchema = new Schema({
  TG_ID: {
    type: Number,
    required: true,
  },
  TG_NAME: {
    type: String,
    required: [true, 'Назва тегу обовʼязкова'],
    trim: true,
  },
});

const Tags = model('Tags', tagsSchema);

module.exports = Tags;
