const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.get("/skin/:username", apiController.getSkin);

module.exports = router;
