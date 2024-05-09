<template>
  <el-container class="home-container">
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

    <el-main>
      <!-- 标题展示 -->
      <div class="title-image"></div>

      <el-row :gutter="20" class="content-display">
          <el-col :span="6" v-for="(card, i) in cards" :key="i">
              <el-card>
                  <img :src="card.logo">
                  <p>{{ card.content }}</p>
              </el-card>
          </el-col>
      </el-row>

      <!-- 近期热门课程推荐 -->
      <div class="hot-course-section">
        <div class="wrapper">
          <h2 class="section-title">近期热门课程推荐</h2>
          
          <!-- 图片轮播区域 -->
          <!-- <el-carousel trigger="click" arrow="always">
            <el-carousel-item v-for="(item, index) in hotList" :key="index">
              <div class="carousel-item-container">
                <div class="carousel-item">
                  <img :src="item.image" alt="" class="carousel-item-img">
                  <p>{{ item.title }}</p>
                </div>
                <div class="carousel-item" v-if="hotList[index + 1]">
                  <img :src="hotList[index + 1].image" alt="" class="carousel-item-img">
                  <p>{{ hotList[index + 1].title }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel> -->
          <el-carousel trigger="click" arrow="always">
            <el-carousel-item v-for="(item, index) in chunkedHotList" :key="index">
              <div class="carousel-item-container">
                <div class="carousel-item" v-for="(subItem, subIndex) in item" :key="`subItem-${subIndex}`" @click="handleClick(subItem)">
                  <img :src="subItem.image" alt="" class="carousel-item-img">
                  <p>{{ subItem.title }}</p>
                </div>        
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      

      <!-- 最新通知 -->
      <div class="announcement-section">
        <div class="wrapper">
          <h2 class="section-title">最新通知</h2>
          <!-- 这里可以添加一个新闻滚动组件或者轮播图的组件 -->
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="quick-access-section">
        <div class="wrapper">
          <h2 class="section-title">快捷入口</h2>
          <!-- 使用卡片或图标来布局你的快捷入口 -->
        </div>
      </div>

    </el-main>

    <!-- 帮助与支持 -->
    <el-footer class="help-section">
      <div class="wrapper">
        <h2 class="section-title">帮助与支持</h2>
        <!-- 更多互动性的帮助链接和信息 -->
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import axios from 'axios';
// Vue 组件
export default {
  data() {
    return {
      hotList: [], // 热门课程列表
      chunkedHotList: [],
      cards: [
        { logo: require('@/assets/icon/icons8-admin-settings-male-100.png'), content: '我们提供用户注册、审核、修改和删除等操作，涵盖管理员、教师及学生/家长等用户角色，并对用户权限进行管理和统计。' },
        { logo: require('@/assets/icon/icons8-course-100.png'), content: '我们处理课程的创建、修改、查询等操作，涉及课程名称、课程描述、课程类别、课程时间、费用等课程信息。同时支持教师创建新课程，学生和家长查询。' },
        { logo: require('@/assets/icon/icons8-popular-100.png'), content: '根据学员行为数据、课程评分和学习倾向，我们智能推荐适合的课程，并着重推荐热门和特别活动课程。' },
        { logo: require('@/assets/icon/icons8-search-100.png'), content: '我们提供全方位的搜索功能，包括关键词搜索、分类筛选和智能排序，快速找到课程或教师，支持模糊匹配和智能提示。' },
        { logo: require('@/assets/icon/icons8-reserve-100.png'), content: '学员可以通过日历界面查看课程时间表，并进行试听课或一对一课程的预约。预约审核通过后，会提醒预约状态和上课时间。' },
        { logo: require('@/assets/icon/icons8-registration-100.png'), content: '我们优化购课流程，选课到支付一步到位。同时，我们支持多种在线支付手段，让购课更方便。' },
        { logo: require('@/assets/icon/icons8-comments-100.png'), content: '用户可以对课程或教师进行评价，以便我们根据评价反馈改进课程质量。' },
        { logo: require('@/assets/icon/icons8-user-100.png'), content: '在用户中心，用户可以管理个人资料，查看课程预约和购买历史，跟踪学习进度，设置喜好，查看交易记录和消费详情' },
      ]
    };
  },
  created() {
    this.fetchCourses();
  },
  methods: {
      redirectItem(link) {
         window.location.href = link;
      },
      fetchCourses() {
        axios.get('http://localhost:3000/api/courses_images')
          .then(response => {
            if(!response.data || !Array.isArray(response.data)) {
              console.error("Invalid API response");
              return;
            }
            this.hotList = response.data.map(course => {
              if (course.image && course.image.data) {
                // Convert the ASCII values in the array to a string
                var imagePath = course.image.data.map(c => String.fromCharCode(c)).join('');
                
                // Create the URL to the image
                course.image = 'http://localhost:3000/' + imagePath;
                console.log(course.image)
              }
              console.log(`Course title: ${course.title}`);
              console.log(`Image URL: ${course.image}`);

              
              return course;
            });
            console.log(`hotlist: ${this.hotList}`);

            let chunkSize = 3;
            for (let i = 0; i < this.hotList.length; i += chunkSize) {
              this.chunkedHotList.push(this.hotList.slice(i,i+chunkSize));
            }
          })
          .catch(error => {
            console.error(error);
          })
      },
      handleClick(subItem) {
        // 这里可以处理点击事件，subItem是点击的那个图片的数据
        // 例如，你可以使用Vue Router来进行页面跳转：
        console.log(subItem)
        //this.$router.push({ name: 'CourseDetail', params: { id: subItem.id}})
        // name是路由名，id是参数，你可以根据你的需要进行修改
      },
   }
};




</script>


<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
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
  margin-left: 20px;
  margin-right: 20px;
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
  
  margin: 0 auto;
  text-align: center;
  /* padding: 50px; */
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
  flex: 1;
  flex-direction: column;
}

.el-card {
     height: 300px; /* 或你想要设置的其他值 */
     transition: transform 0.3s ease-in-out;
}

.el-card:hover {
  transform: scale(1.05);
}

.carousel-item-img {
  height: 55%; /* 根据你的需求调整这个值 */
  width: auto;
  object-fit: cover;
}

.el-carousel, .el-carousel-item {
  height: auto; /* 或者一个具体的值，比如 '300px' */
}

.carousel-item-container {
  display: flex;
  justify-content: space-between;
}

.carousel-item {
  width: 33.33%;
}

.carousel-item:nth-child(3n) {
  margin-right: 0;  /* 每行的第三张图片不添加右边距 */
}
</style>