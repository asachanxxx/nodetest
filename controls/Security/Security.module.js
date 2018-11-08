var express = require('express');
var router = express.Router();
var securityRoute = require('./user.controls');

router.use(securityRoute)

module.exports = router;