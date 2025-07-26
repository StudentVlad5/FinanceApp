const { Account } = require('../../models');

const deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.deleteOne({ _id: id });
    if (account.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    return res.status(204).json({ message: 'No Content' });
  } catch (e) {
    return res.status(400).json({ message: '`Bad request (id incorrect)' });
  }
};
module.exports = deleteAccount;
