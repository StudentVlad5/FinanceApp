const { Schema, model } = require('mongoose');

const subcategorySchema = new Schema(
  {
    CAT1_ID: {
      type: Number,
      required: true,
    },
    CAT1_NAME: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
); // _id: false щоб не створювався окремий _id для кожної підкатегорії

const categoriesSchema = new Schema({
  CAT0_ID: {
    type: Number,
    required: true,
  },
  CAT0_NAME: {
    type: String,
    trim: true,
  },
  CAT_SUBCATEGORIES: {
    type: [subcategorySchema],
    default: [],
  },
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
