const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controllers/shortest-path-Controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/startgame", controller.generateRandomDistancesController);
router.post("/submit", controller.submitDistanceController);
router.get("/getlasttime", controller.getlasttime);

module.exports = router;
