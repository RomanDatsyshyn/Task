const router = require("express").Router();
const tables = require("../controllers/tables");

router.post("/", tables.create);
router.get("/", tables.getAll);
router.get("/:id", tables.getById);
router.put("/:id", tables.update);
router.delete("/:id", tables.delete);

module.exports = router;
