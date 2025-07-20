const { ValidationError } = require("../../helpers");
const { Appointment } = require("../../models");

const createAppointment = async (req, res, next) => {
  const { name, time } = req.body;
  try {
    const createappointment = await Appointment.create({ name, time });
    res.status(200).json(createappointment);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};

module.exports = createAppointment;
