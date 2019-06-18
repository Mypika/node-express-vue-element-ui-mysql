var express = require('express');
var router = express.Router();
var sqlrequ = require('../routes/mysql')

/* GET users listing. */
router.get('/',function(req, res, next) {
  return res.send({
    state:true
  });
});
router.post('/login', async function(req,res,next){
  let user = req.body['user']
  let pass = req.body['pass']
  if(!user||user.length<1||user==''){
    return res.send({
      state:false,
      msg:'请输入管理员名称'
    })
  }
  if(!pass||pass.length<1||pass==''){
    return res.send({
      state:false,
      msg:'请输入登录密码'
    })
  }
  let names = await sqlrequ('SELECT * FROM admin WHERE user=?',user)
  if(names.length<1){
    return res.send({
      state:false,
      msg:'该用户不存在！'
    })
  }
  if(names[0]['pass'].toString()!==pass){
      return res.send({
        state:false,
        msg:'密码错误！'
      })
  }else{
    res.send({
      state:true,
      msg:'登录成功'
    })
  }
 
})
module.exports = router;
