const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const createContragent = async (req, res, next) => {
  const { CAT0_ID, CAT0_NAME } = req.body;
  try {
    const createNewContragent = await Contragents.create({
      CAT0_ID,
      CAT0_NAME,
    });
    console.log('createNewContragent', createNewContragent);
    res.status(200).json({
      success: true,
      data: createNewContragent,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createContragent;
