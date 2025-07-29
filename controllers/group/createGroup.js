const { ValidationError } = require('../../helpers');
const { Group } = require('../../models');

const createGroup = async (req, res, next) => {
  const { SCHG_ID, SCHG_NAME } = req.body;
  try {
    const createNewGroup = await Group.create({
      SCHG_ID,
      SCHG_NAME,
    });
    console.log('createNewGroup', createNewGroup);
    res.status(200).json({
      success: true,
      data: createNewGroup,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createGroup;
