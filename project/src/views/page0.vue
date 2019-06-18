<template>
  <div class="home">
    <h1>首页</h1>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="人类" value="1"></el-option>
          <el-option label="现在" value="2"></el-option>
          <el-option label="未来" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
<el-row v-loading="loading">
  <el-col :span="6" v-for="(val, index) in booklist" :key="index" class="col-card" >
    <el-card id="diy_card" shadow="hover">
       <div slot="header" class="clearfix">
          <span>{{val.book_name}}</span>
        </div>
       <el-image :src="val.img_cover">
          <div slot="error" class="image-slot">
            <el-image src="http://www.33lc.com/article/UploadPic/2012-10/2012101211282264456.jpg"></el-image>
          </div>
        </el-image>
      <div style=" padding: 14px;
    font-size: 14px;
    height: 60px;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    display: -webkit-box;">
        <span>{{val.book_brief}}</span>
        <div class="bottom clearfix">
          <time class="time">12346</time>
        </div>
      </div>
      <el-button type="text" class="button" @click="dialogFormVisible = true">修改书籍信息</el-button>
    </el-card>
  </el-col>
</el-row>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules='rules' ref="form">
        <el-form-item label="书籍名称" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="修改后的书籍名称"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择书籍类型">
            <el-option label="类型一" value="shanghai"></el-option>
            <el-option label="类型二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="书籍封面" :label-width="formLabelWidth">
          <el-input :disabled="iup_dis" v-model="form.imgurl" autocomplete="off" placeholder="修改后的书籍封面地址"></el-input>
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
         <el-form-item label="书籍简介" :label-width="formLabelWidth" prop="brief">
          <el-input type="textarea" v-model="form.brief" autocomplete="off" placeholder="修改后的书籍简介"></el-input>
        </el-form-item>
         <!-- <el-form-item label="书籍名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="修改后的书籍名称"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="submitForm('form')">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getbooklist} from '../api/api'
export default {
  data() {
    return {
      form: {
          name: '',
          region: '',
          imgurl: '',
          brief: '',
        },
      rules:{
        name: [
            { required: true, message: '请填写书籍名称', trigger: 'blur' }
          ],
        region: [
            { required: true, message: '请选择书籍类型', trigger: 'blur' }
          ],
        brief: [
            { required: true, message: '请填写书籍简介.', trigger: 'blur' }
          ]
      },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        loading: false,
        upload:false,
        disabled:false,
        limit:1,
        dialogImageUrl: '',
        dialogVisible: false,
        iup_dis:false,
      booklist:[],
      imgstate:false,
      input3: '',
      select: '',
    }
  },
  watch:{
      'form.imgurl':{
        handler(newv,oldv){
            if(newv.length>0){
               this.disabled=true
            }else{
              this.disabled=false
            }
        }
      },
      deep:true,
      immediate: true,
      
  },
  methods:{
      submitForm(formName){
       this.$refs[formName].validate(valid=>{
          if(valid){

          }else{

          }
       })
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
         this.$refs[formName].resetFields()
      }
  },
  mounted(){
    getbooklist()
    .then(resdata=>{
      this.booklist = resdata.data
    })
  }
}
</script>

<style>
  .el-image{
    width: 180px;
    height: 240px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .col-card{
      padding: 20px;
  }
  #diy_card{
    border: 1px solid #dddddd;
    cursor: pointer;
    text-align: center;
   }
  #diy_card:hover{
   box-shadow: 5px 5px 10px #bbbbbb;
  }
  .clearfix{
    font-size: 20px;
    font-weight: bold;
  }
</style>