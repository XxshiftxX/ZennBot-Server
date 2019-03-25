var express = require('express');
var router = express.Router();

var getList = function(req, res, next) {
  res.json({
    data: "responce with json data"
  });
}
router.get('/', getList);

module.exports = {
  router: router,
  getList: getList
};
