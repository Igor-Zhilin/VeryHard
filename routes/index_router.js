const express = require("express");
const index_controller = require("../controllers/index_controller");

const router = express.Router();

router.get("/", index_controller.index_controller);
router.get("/catalog", index_controller.catalog_controller);
router.post("/catalog/filter", index_controller.filter_catalog_controller);
router.get("/where", index_controller.where_controller);
router.get("/profile", index_controller.profile_controller);
router.post("/addcart", index_controller.addcart_controller);
router.post("/cancel_reserve", index_controller.cancel_reserve_controller);

module.exports = router;
