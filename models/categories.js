const { Schema, model } = require('mongoose');

// --- рівень 3 ---
const subcategory3Schema = new Schema(
  {
    CAT3_ID: { type: Number, required: true, unique: true },
    CAT3_NAME: { type: String, required: true, trim: true },
  },
  { _id: false },
);

// --- рівень 2 ---
const subcategory2Schema = new Schema(
  {
    CAT2_ID: { type: Number, required: true, unique: true },
    CAT2_NAME: { type: String, required: true, trim: true },
    CAT_SUBCATEGORIES: {
      type: [subcategory3Schema],
      default: [],
    },
  },
  { _id: false },
);

// --- рівень 1 ---
const subcategory1Schema = new Schema(
  {
    CAT1_ID: { type: Number, required: true, unique: true },
    CAT1_NAME: { type: String, required: true, trim: true },
    CAT_SUBCATEGORIES: {
      type: [subcategory2Schema],
      default: [],
    },
  },
  { _id: false },
);

// --- головна категорія ---
const categoriesSchema = new Schema({
  CAT0_ID: { type: Number, required: true, unique: true },
  CAT0_NAME: { type: String, trim: true },
  CAT_SUBCATEGORIES: {
    type: [subcategory1Schema],
    default: [],
  },
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
