var express = require('express');
var router = express.Router();
var api = require('../controllers/main.controller')

/* GET home page. */
router.route("/server").get(api.ServerConnect);
router.route("/scrap").post(api.GMapScrap)

module.exports = router;
