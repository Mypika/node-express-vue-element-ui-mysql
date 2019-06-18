const mysqld = require('mysql')

const sqlconfig = {
    host:'47.100.220.190',
    user:'admin',
    password:'10291029',
    database:'Book',
    prot:3306,

}
const sqlpool = mysqld.createPool(sqlconfig)

const sqlquery = function(sql,val){
    return new Promise((resolve,reobjt)=>{
        sqlpool.getConnection((err,contion)=>{
            if(err){
                console.log(err)
                reobjt(err)
            }else{
                contion.query(sql,val,(err,row)=>{
                    if(err){
                        console.log(err)
                        reobjt(err)
                    }else{
                        resolve(row)
                    }
                    contion.release()
                })
            }
        })
    })
}

module.exports=sqlquery;