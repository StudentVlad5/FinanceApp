const { ValidationError } = require('../../helpers');
const { Group } = require('../../models');

const getGroup = async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await Group.find({ _id: id });
    res.status(200).json(group);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getGroup;
