<template>
  <el-container class="home-container">
    <!-- 欢迎区域 -->
    <el-header class="welcome-section">
      <el-row class="content">
        <el-col :span="24">
          <h1 class="title">艺术学校约课管理系统</h1>
          <el-paragraph class="description">
            欢迎来到艺术学校约课管理系统，这里提供了一个全面的平台，让您可以轻松地管理您的课程预约和日程安排。我们的系统特别为艺术学校的师生打造，不仅支持课程浏览、预约，还提供个性化的课程推荐和管理功能。
          </el-paragraph>
          <el-paragraph class="description">
            利用我们直观的界面，您可以快速查看所有可用课程，比较不同课程的特点，并选择最适合您的时间进行约课。老师们也可以使用我们的平台来设置他们的教学时间表，管理学生预约，以及跟踪课程完成情况。
          </el-paragraph>
          <el-paragraph class="description">
            我们致力于确保您的预约体验既便捷又高效，随时通过我们的在线帮助和支持获取帮助。加入我们，开启您的艺术学习之旅，让每一节课都计划得井井有条。
          </el-paragraph>
        </el-col>
      </el-row>
    </el-header>
    <!-- 最新通知 -->
    <el-main class="announcement-section">
      <el-row class="content">
        <el-col :span="24">
          <h2 class="section-title">最新通知</h2>
          <el-list class="announcement-list">
            <el-list-item>校历更新 - 查看最新假期和学期时间表</el-list-item>
            <el-list-item>教师培训 - 下周三在图书馆举行</el-list-item>
            <!-- 更多通知 -->
          </el-list>
        </el-col>
      </el-row>
    </el-main>
    <!-- 快捷入口 -->
    <el-main class="quick-access-section">
      <el-row class="content">
        <el-col :span="24">
          <h2 class="section-title">快捷入口</h2>
          <el-menu class="quick-access-nav">
            <el-menu-item><router-link class="access-link" to="/courses">浏览课程</router-link></el-menu-item>
            <el-menu-item><router-link class="access-link" to="/schedule">我的时间表</router-link></el-menu-item>
            <el-menu-item><router-link class="access-link" to="/account">个人帐户</router-link></el-menu-item>
            <!-- 其他入口 -->
          </el-menu>
        </el-col>
      </el-row>
    </el-main>
    <!-- 帮助与支持 -->
    <el-footer class="help-section">
      <el-row class="content">
        <el-col :span="24">
          <h2 class="section-title">帮助与支持</h2>
          <p>遇到问题？查看我们的 <router-link to="/help">帮助中心</router-link>。</p>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped>

</style>