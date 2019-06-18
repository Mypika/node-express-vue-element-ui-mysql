
<template>
<div>
  <el-form :model="ruleForm2"  status-icon :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title"></h3>
    <el-form-item prop="user">
      <el-input type="text" v-model="ruleForm2.user" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="user" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit2"  :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import { requestLogin } from '../api/api'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          user: 'admin',
          pass: '123456',
        },
        rules2: {
          user: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2() {
      var _this = this;
      this.logining=true
      var datas = {user:this.ruleForm2['user'],pass:this.ruleForm2['pass']}
       requestLogin(datas)
        .then(data=>{
            this.logining=false
            
          if(data['data']['state']){
            sessionStorage.setItem('user',this.ruleForm2['user'])
             this.$message({
               showClose: true,
                message: data['data']['msg'],
                type: 'success',
                duration:2000
              });
            this.$router.push({path: '/' }) 
          }else{
            this.$message({
              showClose: true,
              message: data['data']['msg'],
              type: 'error',
              
            });
          }
        })
        .catch(err=>{
          console.log(err)
        })
        this.$refs.ruleForm2.validate(() => {

        });
      }
    }
  }

</script>
<style >
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
     .remember {
      margin: 0px 0px 35px 0px;
    }
</style>