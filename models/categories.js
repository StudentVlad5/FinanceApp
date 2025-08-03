const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
  CAT0_ID: {
    type: Number,
    required: true,
  },
  CAT0_NAME: {
    type: String,
    required: [true, 'Назва категорії обовʼязкова'],
    trim: true,
  },
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
