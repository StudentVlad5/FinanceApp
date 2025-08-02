const { ValidationError } = require('../../helpers');
const { Tags } = require('../../models');

const createTag = async (req, res, next) => {
  const { TG_ID, TG_NAME } = req.body;
  try {
    const createNewTag = await Tags.create({
      TG_ID,
      TG_NAME,
    });
    console.log('createNewTag', createNewTag);
    res.status(200).json({
      success: true,
      data: createNewTag,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createTag;
