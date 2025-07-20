const { Router } = require("express");
const router = Router();
const { appointments: ctrl } = require("../controllers");

router.get("/get", ctrl.getAppointments);
router.post("/create", ctrl.createAppointment);
router.post("/edit/:id", ctrl.editAppointment);
router.delete("/delete/:id", ctrl.deleteAppointment);

module.exports = routerAppointments = router;
