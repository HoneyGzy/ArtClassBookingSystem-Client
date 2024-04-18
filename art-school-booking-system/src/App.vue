<template>
  <div id="app">
    <!-- 使用登录组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 这部分保持不变

export default {
  name: 'App',

  }

</script>

<style>
/* 这部分保持不变 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>