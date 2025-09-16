const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
  CAT_ID: { type: Number, required: true, unique: true },
  CAT_NAME: { type: String, trim: true },
  CAT_PARENT_ID: Number || String,
  CAT_LEVEL: Number,
  CAT_TYPE_PROFITABLE: Boolean,
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
