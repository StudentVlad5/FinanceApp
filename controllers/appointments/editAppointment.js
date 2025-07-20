const { ValidationError } = require("../../helpers");
const { Appointment } = require("../../models");

const editAppointment = async (req, res, next) => {
  const { name, time } = req.body;
    const { id } = req.params;
  try {
    const editappointment = await Appointment.findByIdAndUpdate({ _id: id }, { name, time });
    res.status(200).json(editappointment);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};
module.exports = editAppointment;
