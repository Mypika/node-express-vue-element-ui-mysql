var express = require('express')
var router = express.Router()
var sqlquery = require('./mysql')

router.get('/',(req,res,next)=>{
  res.send('404')
})

router.post('/modtxt',async (req,res,next)=>{
  if(req.body['name'].length<1){
    return res.send({
      state:false,
      msg:'书籍名称不能为空' 
    })
  }
  if(req.body['imgurl'].length<1){
    return res.send({
      state:false,
      msg:'图片地址不能为空' 
    })
  }
  if(req.body['brief'].length<1){
    return res.send({
      state:false,
      msg:'书籍简介不能为空' 
    })
  }
  if(req.body['id'].length<1){
    return res.send({
      state:false,
      msg:'书籍参数错误，请重试' 
    })
  }
  let name = req.body['name']
  let sqlname =await sqlquery('SELECT * FROM bookList WHERE book_name=?',name)
  console.log(sqlname)
  if(sqlname.length>0&&sqlname[0].id!==req.body['id']){
    return res.send({
      state:false,
      msg:'该书籍名称已经存在'
    })
  }
  let arrwri = [
    req.body['name'],
    req.body['imgurl'],
    req.body['brief'],
    req.body['id'],
  ] 
  console.log(arrwri)
  let sqlwriter =await sqlquery('UPDATE bookList SET book_name=?,img_cover=?,book_brief=? WHERE id=?',arrwri)
  console.log(sqlwriter)
  res.send({
    state:true,
    msg:'修改成功'
  })
})
module.exports = router