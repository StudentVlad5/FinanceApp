const { ValidationError } = require("../../helpers");
const { Appointment } = require("../../models");

const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.deleteOne({ _id: id });
    if (appointment.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    return res.status(204).json({ message: "No Content" });
  } catch (e) {
    return res.status(400).json({ message: "`Bad request (id incorrect)" });
  }
};
module.exports = deleteAppointment;
