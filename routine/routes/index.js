var express = require('express');
var router = express.Router();
const sqlquery = require('./mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1111111111111' });
});
// 获取列表
router.get('/bookList',function(req,res,next){
   let booklist =  sqlquery('SELECT * FROM bookList LIMIT 10')
   booklist.then(resdata=>{
    res.send(resdata)
   })
  
})
module.exports = router;
