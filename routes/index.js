var express = require('express');
var router = express.Router();
var tw = require('./twitch');

router.get('/', async function(req, res, next) {
  var re = await tw.GetPiece({
    username: 'qjfrntop'
  });
  console.log(re);
  res.json(re);
});

module.exports = router;
