<template>
  <el-container class="home-container">
    <!-- <el-scrollbar class="my-scrollbar"> -->
      <!-- 欢迎区域 -->
      <el-header class="header-background">
        <!-- Logo区域 -->
        <div class="logo">
          <!-- <img src="path_to_logo_image" alt="艺术学校Logo" /> -->
        </div>

        <!-- 注册和登录按钮 -->
        <div class="auth-buttons">
          <el-button class="register" type="primary">注册</el-button>
          <el-button class="login" type="primary">登录</el-button>
        </div>
      </el-header>
      <!-- 标题展示 -->
      <el-main class="title-display">
          <div class="title-image"></div>

          <el-row :gutter="20" class="content-display">
              <el-col :span="6" v-for="(card, i) in cards" :key="i">
                  <el-card>
                      <img :src="card.logo">
                      <p>{{ card.content }}</p>
                  </el-card>
              </el-col>
          </el-row>
      </el-main>

      <!-- 最新通知 -->
      <el-main class="announcement-section">
        <div class="wrapper">
          <h2 class="section-title">最新通知</h2>
          <!-- 这里可以添加一个新闻滚动组件或者轮播图的组件 -->
        </div>
      </el-main>

      <!-- 快捷入口 -->
      <el-main class="quick-access-section">
        <div class="wrapper">
          <h2 class="section-title">快捷入口</h2>
          <!-- 使用卡片或图标来布局你的快捷入口 -->
        </div>
      </el-main>

      <!-- 帮助与支持 -->
      <el-footer class="help-section">
        <div class="wrapper">
          <h2 class="section-title">帮助与支持</h2>
          <!-- 更多互动性的帮助链接和信息 -->
        </div>
      </el-footer>
    <!-- </el-scrollbar> -->
  </el-container>
</template>


<script>
// Vue 组件
export default {
  data() {
    return {
      cards: [
        { logo: 'logo地址1', content: '本系统的用户类型主要分为管理员，教师，学生/家长，用户管理是对系统中的用户进行添加、修改、删除等操作的功能。基本流程包括用户注册、用户审核、用户修改、用户删除、用户权限管理和用户统计等。' },
        { logo: 'logo地址2', content: '课程信息主要包括课程名称、课程描述、课程类别、课程时间、费用等[5]。管理员可进行课程的创建、修改、删除、查询等各种操作；也允许教师创建新课程；学生或家长可查询课程信息' },
        { logo: 'logo地址3', content: '结合学员的行为数据、课程评分和学习倾向，根据课程的热度和用户的兴趣智能推荐适合的课程，同时突出展示系统热门或特别活动课程，增加课程参与度' },
        { logo: 'logo地址4', content: '提供全方位的搜索功能，包括关键词搜索、分类筛选以及智能排序选项，可快速找到特定课程或教师，支持模糊匹配和智能提示，增强用户体验' },
        { logo: 'logo地址5', content: '学员能够通过日历界面直观查看课程时间表，并通过几步简易操作完成试听课或是一对一课程的预约，管理员在审核通过后会提醒用户预约状态和上课时间' },
        { logo: 'logo地址6', content: '打造方便快捷的课程购买流程，从选课到支付一气呵成，支持在线支付手段' },
        { logo: 'logo地址7', content: '允许用户对课程或者教师进行评价，管理员会将评价结果反馈给相关人员，以便改进课程质量' },
        { logo: 'logo地址8', content: '用户可以在这里管理个人资料，查看预约课程和购课历史，跟踪学习进度，进行喜好设置，并查看交易记录和消费详情' },
      ],
    };
  },
};




</script>


<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* background-image: url('~@/assets/background.jpg'); */
  /* background-color: #cc1818; */
  overflow-y: auto;
  margin-left: 300px;
  margin-right: 300px;
}

.header-background {
  /* 在这里添加全屏背景图片样式 */
  background-size: cover;
  background-position: center;
  background-color: rgb(255, 255, 255);
  color: #050505;
  height: 200px;
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 子元素间距平分 */
  align-items: center; /* 垂直居中 */
  padding: 0px;
}

.title-display{
  /* background-color: green; */
  padding: 0px;
  font-family: Arial;
  font-size: 10px;
  margin:0px;
}
.content-display{
  margin-top: 20px;
}
.title-image{
  background-image: url('~@/assets/art-book-school.png');
  background-size: cover;
  height: 1000px;

}

.logo {
  /* Logo样式，根据需求来定义尺寸 */
  background-image: url('~@/assets/b9871091f1591d50.png');
  background-size: cover;
  height: 138px;
  width: 670px;
}

.logo img {
  height: 50px; /* 根据Logo实际大小调整 */
  /* 其他可能需要的样式... */
}

.wrapper {
  /* 前面给出的.wrapper样式不变 */
}

.auth-buttons {
  /* 注册和登录按钮区域样式 */
  padding-right: 0px; /* 或者根据设计需要调整间距 */
}

.auth-buttons .register,
.auth-buttons .login {
  margin-left: 10px; /* 按钮之间的间距 */
  /* 按钮共同样式 */
}

/* 单独为注册和登录按钮定制的样式 */
.auth-buttons .register {

}

.auth-buttons .login {
  /* 特定于登录按钮的样式 */

}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
}


.title {
  /* 自定义标题样式 */
  font-size: 3em;
  margin-bottom: 0.5em;
}

.description {
  /* 自定义段落风格 */
  color: #aaa;
}

.section-title {
  /* 自定义小节标题样式 */
  margin-bottom: 1em;
}

/* 添加一些过渡效果增强视觉体验 */
.el-header, .el-main, .el-footer {
  opacity: 0;
  animation: fadeIn 1.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.el-main {
    overflow-x: hidden;
}

.home-container,
.el-scrollbar {
  overflow: hidden;
}

.my-scrollbar::-webkit-scrollbar {
  display: none !important;
}
</style>