const createCategory = require('./createCategory');
const editCategory = require('./editCategory');
const getAllCategories = require('./getAllCategories');
const getCategory = require('./getCategory');
const deleteCategory = require('./deleteCategory');
const addSubcategory = require('./addSubcategory');
const deleteSubcategory = require('./deleteSubcategory');

module.exports = {
  getAllCategories,
  createCategory,
  getCategory,
  deleteCategory,
  editCategory,
  addSubcategory,
  deleteSubcategory,
};
