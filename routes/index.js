var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("input")
});


router.get("/output",(req,res)=>{
  res.render("output")
})

module.exports = router;
