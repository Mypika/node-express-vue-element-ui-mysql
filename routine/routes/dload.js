var express = require('express');
var router = express.Router();
var cheerio = require('cheerio')
var axios = require('axios')
var fs = require('fs')
var async = require('async')
var sqlquery = require('./mysql')

// 获取小说目录列表
var TxtList = function(tim){
      return new Promise((reslove,rejobt)=>{
        axios.get(tim)
        .then(resdata=>{
          var arr = [];
          let $ = cheerio.load(resdata.data)
          $('.dirlist li').each(function(){
            var obj = {}
            obj.imgs = $('.novelinfo-r').find('img').attr('src')
            obj.tit = $(this).find('a').text()
            obj.href = $(this).find('a').attr('href')
          arr.push(obj)
          })
          reslove(arr)
        })
      })
}
function dowlds(url,href,name,index,ID){
  axios.get(url+href,{timeout: 10000 * 60 * 5})
  .then(rdata=>{
    let TXT = cheerio.load(rdata.data.toString())
    let txtbox = TXT(".txt_cont h1").text()+'///'+TXT("#content1").text()+'&&'
    fs.writeFile('TXT/'+ID+'/'+index+'&'+TXT(".txt_cont h1").text()+'.txt',txtbox,{flag:'a'},function(err){
      if(err){
          console.log(err)
      }else{
          console.log('下载章节'+TXT(".txt_cont h1").text()+'//成功')
      }
    })
  })
  .catch(err=>{
    console.log(err)
  })
}
// 下载电子书
var TxtLoad = function(url,name,imgurl,brief){
  return new Promise((reslove,rejobt)=>{
    axios.get(url)
    .then(resdata=>{
      var arr = [];
      let $ = cheerio.load(resdata.data.toString())
      if(imgurl==1){
        let bookurl ='https://www.qisuu.la'+$('.tupian img').attr('src')
        sqlquery('UPDATE bookList SET img_cover=? WHERE book_name=?',[bookurl,name])
        console.log(imgurl)
      }
      if(brief==1){
        let bookbrief = $('.intro').text()
        console.log(bookbrief)
        sqlquery('UPDATE bookList SET book_brief=? WHERE book_name=?',[bookbrief,name])
      }
      $('.pc_list').each(async function(index){
          if(index==1){
            let ID =await sqlquery('SELECT id FROM bookList WHERE book_name=?',name)
            fs.mkdir('TXT/'+ID[0].id+'/',{ recursive: true },function(err){
                if(err){
                    console.log(err)
                }else{
                   console.log(`´´´´´´´████´´´´´´
                   ´´´´´████████´´´´
                   ´´´███▒▒▒▒███´´´´´
                   ´´´███▒●▒▒●▒██´´´
                   ´´´███▒▒▒▒▒▒██´´´´
                   ´´´███▒▒▒▒██´              开      
                   ´´██████▒▒███´´´´´         始     
                   ´██████▒▒▒▒███´´           下      
                   ██████▒▒▒▒▒▒███´´´´        载     
                   ´´▓▓▓▓▓▓▓▓▓▓▓▓▓▒´´         。     
                   ´´▒▒▒▒▓▓▓▓▓▓▓▓▓▒´´´´´      。     
                   ´.▒▒▒´´▓▓▓▓▓▓▓▓▒´´´´´      。      
                   ´.▒▒´´´´▓▓▓▓▓▓▓▒           。      
                   ..▒▒.´´´´▓▓▓▓▓▓▓▒          。      
                   ´▒▒▒▒▒▒▒▒▒▒▒▒              。  
                   ´´´´´´´´´███████´´´´´              
                   ´´´´´´´´████████´´´´´´
                   ´´´´´´´█████████´´´´´´
                   ´´´´´´██████████´´´´             大部分人都在关注你飞的高不高，却没人在乎你飞的累不累，这就是现实！
                   ´´´´´´██████████´´´                     我从不相信梦想，我，只，相，信，自，己！
                   ´´´´´´´█████████´´
                   ´´´´´´´█████████´´´
                   ´´´´´´´´████████´´´´´
                   ________▒▒▒▒▒
                   _________▒▒▒▒
                   _________▒▒▒▒
                   ________▒▒_▒▒
                   _____ ▒▒___▒▒
                   _____▒▒___▒▒
                   ____▒▒____▒▒
                   ___▒▒_____▒▒
                   ███____ ▒▒
                   ████____███
                   █ _███_ _█_███
           --------------------- `)
                }
              })
          arr = $(this).find('ul li')
          let n =Math.ceil( arr.length/20)
          let i=0
          let timer;
         try{
          timer = setInterval(()=>{
            if(i<n){
              arr.each(function(index){
                let href = $(this).find('a').attr('href')
                 if(index<20*(i+1)&&index>=20*i){
                  dowlds(url,href,name,index,ID[0].id)
                 }else{
                   return true
                 }
                })
                i++
            }else{
              sqlquery('UPDATE bookList SET book_state=? WHERE book_name=?',[1,name])
              console.log('下载完成')
              clearInterval(timer)
            }
          },2000)
         }
         catch{
          sqlquery('UPDATE bookList SET book_state=? WHERE book_name=?',[0,name])
         }
        }
      })
      reslove('创建抓取任务成功，进入后台下载')
    })
  })
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list',function(req,res,next){
  let url="https://www.qisuu.la/du/36/36878/"
  let TxtLists = TxtList(url)
  TxtLists.then(resdata=>{
    res.send(resdata)
  })
})
router.post('/wload',async function(req,res,next){  
  let url = req.body['url']
  let name = req.body['name']
  let brief = req.body['brief']
  let imgurl = req.body['imgurl']
 axios.get(url)
  .then(async datas=>{
    console.log('验证下载地址可用')
    let book_name = await sqlquery('SELECT * FROM bookList WHERE book_name=?',name)
  if(book_name.length>0){
    return res.send({
      state:false,
      msg:'该书已经被下载，请勿重复下载'
      }
    )
  }
  if(brief==''||brief==undefined||brief.length<1||brief==null){
      brief=1;
  }
  if(imgurl==''||imgurl==undefined||imgurl.length<1||imgurl==null){
    imgurl=1;
  }
  let bodys = [name,imgurl,brief,url,2]
  let save = await sqlquery('INSERT INTO bookList (book_name,img_cover,book_brief,book_ssy,book_state,book_time) VALUES (?,?,?,?,?,NOW())',bodys)
  let TxtLoads = TxtLoad(url,name,imgurl,brief)
  TxtLoads.then(resdata=>{
    res.send({
      state:true,
      msg:'创建抓取任务成功，进入后台下载'
    })
    })
  })
  .catch(err=>{
      console.log('下载地址不可用')
      return res.send({
        state:false,
        msg:'下载地址不可用'
      })
  })
  
})
module.exports = router;
