<template>
  <div class="home">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="success">成功0000000000000000按钮</el-button>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'page1',
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
