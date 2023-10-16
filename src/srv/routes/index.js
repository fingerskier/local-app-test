const debug = require('debug')('localapp:routes.index')
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({version: '2023.10.16'})
});


module.exports = router;