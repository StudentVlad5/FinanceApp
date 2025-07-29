const { ValidationError } = require('../../helpers');
const { Group } = require('../../models');

const getAllGroup = async (req, res, next) => {
  try {
    const group = await Group.find();
    res.status(200).json(group);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllGroup;
