var express = require('express')
var wsserver = require('ws').Server

var router = express.Router()

// wss.on('connection',function(wxs){  
//       wxs.on('message',function(mesg){
//         wxs.send(mesg)
//       })
// })
    wss = new wsserver({
        port: 8180,//监听接口
        clientTracking:true  //可选，统计连接数量
    });

    // 链接验证函数，可在info参数中获取信息
function socketVerify(info) {
    return true; 
}
//广播
wss.broadcast = function broadcast(s,ws) {
    wss.clients.forEach((client,index)=>{
        console.log(client==index)
        // if (typeof client.user != "undefined") {
        	if(s == 1){
       		    client.send(ws.name+'说'+ ":" + ws.msg);
        	}
        	if(s == 0){
        		client.send(ws + "退出聊天室");	
        	}
        // }
    });
};
// 初始化
wss.on('connection', function connection(ws,wxss){
    // console.log( wss.clients.length);
    // console.log("在线人数", wss.clients.length);
    // ws.send('你是第' + wss.clients.length + '位');
    // 发送消息
    ws.on('message', function(jsonStr,flags) {
        jsonStr = JSON.parse(jsonStr)
        console.log(jsonStr)
        // this.user = obj;
        // if (typeof this.user.msg != "undefined") {
            wss.broadcast(1,jsonStr);
        // }
    });
    // 退出聊天
    ws.on('close', function(close) {
        try{
        	wss.broadcast(0,this.user.name);
        }catch(e){
        	console.log('刷新页面了');
        }
    });
});
router.get('/',function(req,res,next){
    res.send('lll')
})

module.exports=router;