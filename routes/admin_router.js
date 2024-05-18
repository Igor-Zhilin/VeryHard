const express = require("express");
const admin_controller = require("../controllers/admin_controller");
const router = express.Router();
router.get("/", admin_controller.admin_controller);
router.post("/card_create", admin_controller.post_card_create);
router.post("/card_delete", admin_controller.post_card_delete);
router.post("/card_delete_reserv", admin_controller.post_card_delete_reserv);

module.exports = router;
