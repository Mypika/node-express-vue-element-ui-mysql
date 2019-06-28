var express = require('express');
var router = express.Router();
const sqlquery = require('./mysql')
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '1111111111111' });
});
// 获取列表
router.get('/bookList',function(req,res,next){
   let booklist =  sqlquery('SELECT * FROM bookList LIMIT 20')
   booklist.then(resdata=>{
    res.send({
      stata:true,
      data:resdata
    })
   })
})
// 排序算法
function sortId(a,b){  
  return a[0]-b[0]
}
// 读取目录
router.get('/bookcate',function(req,res,next){
  let bName = req.query.bName
  console.log(bName)
  fs.readdir('./TXT/'+bName,function(err,data){
    if(err){
      res.send({
        state:false,
        data:'读取目录列表失败'
      })
    }else{
    let sortdata = [] 
     for(val in data){
      let sortd = data[val].split('.txt')
      let sorta = sortd.join('').split('&')
      sortdata.push(sorta)
     }
      res.send({
        state:true,
        data:sortdata.sort(sortId)
      })
    }
  })
})
router.get('/wxbookcon',function(req,res,next){
  let bName = req.query.bName
  let Bid = req.query.Bid
  fs.readdir('./TXT/'+bName,function(err,data){
    if(err){
      res.send({
        state:false,
        data:'读取内容失败'
      })
    }else{
     for(val in data){
      let sortd = data[val].split('.txt')
      let sorta = sortd.join('').split('&')
      if(sorta[0]==Bid){
        fs.readFile('./TXT/'+bName+'/'+data[val],{encoding:'utf-8'},function(err,data){
          if(err){
            throw err
          }else{
            res.send({
              state:true,
              data:data
            })
          }
        })
        return
      }
     }
     
    }
  })

})
module.exports = router;
