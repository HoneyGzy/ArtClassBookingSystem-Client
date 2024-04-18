<template>
    <el-container class="dashboard-container">
      <el-header class="dashboard-header">
        <h1 class="dashboard-title">艺术学校约课管理系统</h1>
        <div class="user-info">
          <span class="username">{{ username }}</span>
          <el-button type="primary" class="logout-button" @click="logout">退出</el-button>
        </div>
      </el-header>
  
      <el-container>
        <el-aside width="200px" class="dashboard-nav">
          
          <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            background-color="#333"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose"
            mode="vertical">
            
            <el-menu-item index="1">
              <i class="el-icon-house"></i>
              首页
            </el-menu-item>
            
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              课程列表
            </el-menu-item>
            
            <el-menu-item index="3">
              <i class="el-icon-search"></i>
              课程搜索
            </el-menu-item>
            
            <el-sub-menu index="2">
                <template #title>
                <span>课程管理</span>
                </template>
                <el-menu-item index="2-1">增加</el-menu-item>
                <el-menu-item index="2-2">删除</el-menu-item>
                <el-menu-item index="2-3">编辑</el-menu-item>
            </el-sub-menu>
            
            <el-menu-item index="5">
              <i class="el-icon-star-on"></i>
              热门推荐
            </el-menu-item>
            
            <el-menu-item index="6">
              <i class="el-icon-circle-check"></i>
              预约课程
            </el-menu-item>
            
            <el-menu-item index="7">
              <i class="el-icon-shopping-cart-2"></i>
              购课报名
            </el-menu-item>
            
            <el-menu-item index="8">
              <i class="el-icon-user"></i>
              用户管理
            </el-menu-item>
            
            <el-menu-item index="9">
              <i class="el-icon-data-analysis"></i>
              数据分析
            </el-menu-item>
          </el-menu>
  
        </el-aside>
  
        <el-main class="content-display">
          <!-- 你的内容组件将在这里渲染 -->
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  // 在这里导入你需要使用的Element Plus组件
  export default {
    name: 'DashboardComponent',
    data() {
      return {
        username: '用户123'
        // 其他数据属性
      };
    },
    methods: {
      logout() {
        console.log('执行注销操作');
        // 实现注销逻辑
      }
      // 其他方法
    },
  };
  </script>
  
  <style scoped>
  /* 确保所有样式与Element Plus兼容 */
  /* ...这里写你的样式... */
  
  .dashboard-header,
  .dashboard-nav {    
    background-color: #333;
  }
  
  .el-header,
  .el-aside {
    color: white;
  }
  
  /* ...其他样式... */
  </style>