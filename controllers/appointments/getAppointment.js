const { ValidationError } = require("../../helpers");
const { Appointment } = require("../../models");

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAppointments;
