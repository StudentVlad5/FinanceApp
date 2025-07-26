const { ValidationError } = require('../../helpers');
const { Users } = require('../../models');
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require('../../helpers');
let path = require('path');
const bcrypt = require('bcryptjs');

const update = async (req, res, next) => {
  const { id } = req.params;
  const newData = dataFilter(req.body, userFieldReceivedFromFront);
  if (!newData) {
    throw new ValidationError('Bad request, invalid data');
  }
  req.file?.path && (newData.avatar = path.basename(req.file?.path));
  if (newData?.password) {
    newData.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10),
    );
  }
  const resUpdate = await Users.findOneAndUpdate({ _id: id }, newData, {
    new: true,
  });
  const newResponse = dataFilter(resUpdate, userMainField);
  req.file?.path && (newResponse.avatar = path.basename(req.file?.path));
  res.status(201).json(newResponse);
};
module.exports = update;
