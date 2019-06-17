import axios from 'axios'

// let HttpUrl = 'http://47.100.220.190:2080'
// let Httploca = 'http://47.100.220.190:3000'
let Httploca = 'http://localhost:3000'
// 登录验证请求
export const requestLogin = parms=>{
    return axios.post(Httploca+'/users/login',parms,)
}
// 小说下载请求
export const DowloadTXT = parms=>{
    return axios.post(Httploca+'/dload/wload',parms, {timeout: 1000 * 60 * 20})
}
// 获取电子书列表
export const getbooklist = parms=>{
    return axios.get(Httploca+'/bookList',parms)
}

export const GetTxtUrl = parms=>{
    return axios.get(parms)
}