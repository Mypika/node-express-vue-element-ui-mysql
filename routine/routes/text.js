var express = require('express')
var router = express.Router()
var sqleuery = require('./mysql')

router.get('/',(req,res,next)=>{
  res.send('404')
})

router.post('/modtxt',(req,res,next)=>{
  res.send({
    state:true,
    mmsg:'请求成功'
  })
})

module.exports = router