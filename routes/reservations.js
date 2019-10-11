const router = require("express").Router();
const reservation = require("../controllers/reservations");

router.post("/", reservation.create);
router.get("/:id", reservation.getById);
router.put("/:id", reservation.update);
router.delete("/:id", reservation.delete);

module.exports = router;
