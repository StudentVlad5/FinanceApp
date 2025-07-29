const { ValidationError } = require('../../helpers');
const { Types } = require('../../models');

const createType = async (req, res, next) => {
  const { TPSCH_ID, TPSCH_NAME } = req.body;
  try {
    const createNewType = await Types.create({
      TPSCH_ID,
      TPSCH_NAME,
    });
    res.status(200).json({
      success: true,
      data: createNewType,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createType;
