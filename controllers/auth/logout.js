const { Users } = require('../../models');

const logout = async (req, res, next) => {
  console.log('req', req);
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(401).json({ code: 401, message: 'Unauthorized' });
    }

    await Users.findByIdAndUpdate(_id, { authToken: null });
    return res.status(204).end(); // 204 should not have a body
  } catch (error) {
    next(error); // forward error to error-handling middleware
  }
};

module.exports = logout;
