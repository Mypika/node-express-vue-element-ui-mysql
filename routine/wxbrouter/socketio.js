var express = require('express')
var socket = require('nodejs-websocket')
var router = express.Router()

var contionNumber = 0;//在线人数
var onlines = []//在线人员信息
// 创建一个ws服务
var wsServe = socket.createServer(contion=>{
    contionNumber++
    console.log('已连接')
    contion.on('text',function(str){
            str = JSON.parse(str)
            // console.log(str)
            str.contion = contionNumber
            broadcast(JSON.stringify(str))
    })
    contion.on("close",function(code){
        contionNumber--
        console.log('已关闭')
    })
    contion.on('error',function(err){
        console.log(err)
    })
}).listen(8180)
// 广播
var broadcast = function(str){
    console.log(wsServe.connections)
    wsServe.connections.forEach(function(conne){
        console.log(str)
        conne.send(str)
    })       
}
router.get('/',function(req,res,next){
    res.send('lll')
})
module.exports=router;