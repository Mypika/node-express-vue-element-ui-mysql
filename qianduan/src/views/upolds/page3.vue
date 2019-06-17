<template>
  <div class="home">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
      <el-form-item label="目录页url:" prop="url">
        <el-input v-model="form.url" placeholder="https://www.qisuu.la/du/36/36878/"></el-input>
      </el-form-item>
      <el-form-item label="小说名称:" prop="name">
        <el-input v-model="form.name"  placeholder="建议填写真实的小说名称"></el-input>
      </el-form-item>
      <el-form-item label="封面:">
        <el-input v-model="form.imgurl" :disabled="iup_dis" placeholder="封面可以为空，接口将自动抓取目标地址封面"></el-input>
        <el-upload
            action="123456s"
            list-type="picture-card"
            :auto-upload='upload'
            :limit='limit'
            :disabled="disabled"
            :on-preview="handlePictureCardPreview"
            :on-change="change"
            :on-remove="handleRemove"
            :on-exceed='exceed'
            show-file-list>
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">可以选择填写图片可访问url地址或者上传本地图片，只能选一个</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </el-form-item>
      <el-form-item label="小说简介:">
        <el-input type="textarea" v-model="form.brief" placeholder="简介可以为空，接口将自动抓取目标地址简介"></el-input>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="submitForm('form')">立即抓取</el-button>
        <el-button type="primary" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {DowloadTXT} from '../../api/api'
  export default {
    data() {
    var GetTxt=(rule, value, callback)=>{
        if(value.indexOf('http')==-1&&value.length<10){
            callback(new Error('别逗，请输入一个正确的地址'))
        }else{
          callback()
        }
    }
      return {
        form: {
          url:'https://www.qisuu.la/du/36/36878/',
          name: '',
          imgurl: '',
          brief: '',
        },
        rules: {
          url: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { validator: GetTxt, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请填写小说名称', trigger: 'blur' }
          ],
        },
        dialogImageUrl: '',
        dialogVisible: false,
        disabled:false,
        iup_dis:false,
        multip:true,
        upload:false,
        limit:1,
      }
    },
    computed:{
      imgurls(){
        return this.form.imgurl
      }
    },
    watch:{
      imgurls(){
        if(this.imgurls.length>0){
            this.disabled=true
        }else{
          this.disabled=false
        }
      },
      dialogImageUrl(){
      }
    },
    methods: {
      submitForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
        const loading = this.$loading({
          lock: true,
          text: '下载中，请勿关闭浏览器或者重复下载',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          DowloadTXT(this.form)
          .then(resdata=>{
            loading.close();
            if(resdata.data.state){
              this.$alert('<strong>'+resdata.data.msg+'</strong>', '下载提示', {
              type: 'success',
             dangerouslyUseHTMLString: true
             });
            }else{
               this.$alert('<strong>'+resdata.data.msg+'</strong>', '下载提示', {
              type:'error',
             dangerouslyUseHTMLString: true
             });
            }
          })
          .catch(err=>{
            console.log(err)
            loading.close();
            this.$alert('<strong>下载失败</strong>', '下载提示', {
              type:'error',
             dangerouslyUseHTMLString: true
             });
          })
        // this.$refs.upload.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
          
      },
       handleRemove(file, fileList) {
       this.iup_dis = false
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisible = true;
      },
      change(){
        this.iup_dis = true
      },
      exceed(){
        this.$message({
              showClose: true,
              message: '只能上传一张',
              type: 'error',

            });
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.imgurl='';
        this.form.brief='';
      }
    }
  }
</script>
