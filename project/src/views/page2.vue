<template>
  <div class="home">
    <el-row>
        <el-button plain>朴素按钮</el-button>

        <el-button type="info" plain>信息按钮</el-button>
     
</el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'page2',
  // components: {
  //   HelloWorld
  // }
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
