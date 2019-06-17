<template>
  <div class="home">
    <div class="Home_top">
      <el-row>
        <el-col :span="24">
          <div class="grids">
            <div class="grid-content bg-purple">管理</div>
            <div class="bg-purple-light">
                 <el-dropdown trigger="click" @command="handcommand">
                  <span class="el-dropdown-link" >
                   管理员<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item icon="el-icon-user-solid">个人资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-tools">设置</el-dropdown-item>
                    <el-dropdown-item :command="outloagin">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="Home_body">
      <div class="left_body">
      <el-row :span="24" class="tac">
        <el-col class="meau">
          <el-menu
          unique-opened
            router
            :default-active='$router.path'
            class="el-menu-vertical-demo meau_hei"
            @open="handleOpen"
            @close="handleClose"
            background-color="#acd4f1"
            text-color="#fff"
            active-text-color="#ffd04b">
          <div v-for="(val,index) in $router.options.routes" :key="index" v-if="val.hiddren">
            <el-submenu :index="index+''">
              <template slot="title">
                <i :class="val.iconCls"></i>
                <span>{{val.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(val,index) in val.children" :key="index" :index='val.path'>
                      {{val.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
          </el-menu>
        </el-col>
    </el-row>
  </div>
  <div class="right_body">
    <el-row :span="24">
      <el-col class="Home_news">
          <transition name="fade" mode="out-in">
							<router-view></router-view>
					</transition>
      </el-col>
    </el-row>
   </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // }
   methods: {
      handleOpen(key, keyPath) {
       
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handcommand(command){
          command()
      },
      outloagin(){
       this.$router.push({path:'/login'})
      }
    }
}
</script>
<style>
  .home{
    position:absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .el-submenu{
    text-align: left;
  }
  .Home_top{
    height: 50px;
    background: #03a9f4;
    line-height: 50px;
    color: #ffffff;
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 99;
  }
  .Home_body{
    width: 100%;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden;
  }
  .left_body,
  .grid-content{
    width: 30%;
    height:100%;
    max-width: 230px;
    min-width: 200px;
  }
  .tac{
    height: 100%;
  }
  .meau{
    height:100%;
  }
  .meau_hei{
    height: 100%;
  }
  .right_body{
    padding: 20px;
    flex: 1;
    width: 100%;
    overflow-y: scroll;
  }
  .Home_news{
    overflow-y: scroll;
    /* height: 120vh; */
  }
  .grid-content{
      text-align: center;
      border-right: 1px solid #c3c0c0;
  }
  .bg-purple-light{
        padding-right: 40px;
  }
  .grids{
    display:flex;
    justify-content: space-between;
  }
  .el-dropdown-link{
    color:#ffffff;
  }
</style>
