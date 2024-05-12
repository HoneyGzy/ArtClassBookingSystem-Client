<template>
  <el-container class="home-container">
    <!-- 欢迎区域 -->
    <el-header class="header-background">
      <!-- Logo区域 -->
      <div class="logo">
        <!-- <img src="path_to_logo_image" alt="艺术学校Logo" /> -->
      </div>

      <!-- 注册和登录按钮 -->
      <div class="user-info">
        <span class="username">欢迎您：{{ username }}</span>
        <el-button type="primary" class="logout-button" @click="logout">退出</el-button>
      </div>
    </el-header>

    <el-main>
      <!-- 标题展示 -->
      <div class="title-image"></div>

      <!-- <el-row :gutter="20" class="content-display">
          <el-col :span="6" v-for="(card, i) in cards" :key="i">
              <el-card>
                  <img :src="card.logo">
                  <p>{{ card.content }}</p>
              </el-card>
          </el-col>
      </el-row> -->

      <!-- 近期热门课程推荐 -->
      <div class="hot-course-section">
        <div class="wrapper">
          <h2 class="section-title">近期热门课程推荐</h2>
          
          <!-- 图片轮播区域 -->
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

      <!-- 艺术课程分类 -->
      <div class="course-category-section">
        <div class="wrapper">
          <h2 class="section-title">查看现有课程</h2>
          <!-- 网格布局 -->
          <el-row :gutter="20">
              <el-col :span="6" v-for="(item, idx) in course_categories" :key="idx">
                  <el-card @click="handleCardClick(idx)">
                      <img :src="item.image" :alt="item.alt" class="category-image">
                      <p>{{ item.description }}</p>
                  </el-card>
              </el-col>
          </el-row>
        </div>
      </div>

      <el-dialog v-model="dialogVisible" width="50%" :before-close="handleClose">
          <span>你点击了 {{ clickedCardIndex + 1 }} 号卡片</span>
          <el-row :gutter="20">
            <CourseCard :searchResults="pagedResults"/>
          </el-row>
          <transition name="fade">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="searchResults.length">
            </el-pagination>
          </transition>

          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </template>
      </el-dialog>

      <div class="annotation-container">
        <!-- 最新通知 -->
        <div class="annotation-item">
          <h2 class="section-title">新闻</h2>
          <el-carousel :interval="3000">
            <el-carousel-item v-for="item in carouselItems" :key="item.index">
              <img :src="item.image" class="image" alt="Image" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 最新资讯 -->
        <div class="annotation-item">
          <h2 class="section-title">最新资讯</h2>
          <!-- 在这里添加您的资讯内容 -->
          <el-list class="el-list-news">
            <el-list-item
              v-for="(news, index) in latestNews"
              :key="index"
              class="news-item"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content date">{{ news.date }}</div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content title">{{ news.title }}</div>
                </el-col>
              </el-row>
            </el-list-item>
          </el-list>
        </div>
        
        <!-- 最新通知 -->
        <div class="annotation-item">
          <h2 class="section-title">最新通知</h2>
          <!-- 在这里添加您的通知内容 -->
          <el-list class="el-list-news">
            <el-list-item
              v-for="(news, index) in latestNews"
              :key="index"
              class="news-item"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content date">{{ news.date }}</div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content title">{{ news.title }}</div>
                </el-col>
              </el-row>
            </el-list-item>
          </el-list>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="quick-access-section">
          <h2 class="contact-title">联系我们</h2>
          <h3 class="section-title">有任何感兴趣的课程或者疑问请随时联系我们</h3>
          <!-- 使用卡片或图标来布局你的快捷入口 -->
          <el-form 
            :model="form" 
            ref="form" 
            class="contact-form"
          >
            <el-form-item label="姓名" label-width="80px" prop="name" :rules="[ { required: true, message: '请输入姓名' } ]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="80px" prop="phone" :rules="[ { required: true, message: '请输入联系电话' } ]">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item  label="留言" label-width="80px" :rules="[ { required: true, message: '请输入留言内容' } ]">
              <el-input type="textarea" v-model="form.content" rows = 5></el-input>
            </el-form-item>
          </el-form>
          <el-button class="submit-button" type="primary" @click="submitForm('form')">提交</el-button>
      </div>


    </el-main>

    <!-- 帮助与支持 -->
    <!-- <el-footer class="help-section">
      <div class="wrapper">
        <h2 class="section-title">帮助与支持</h2>
      </div>
    </el-footer> -->
  </el-container>
</template>

<script>

import axios from 'axios';
import { ref, reactive } from 'vue';
import CourseCard from './CourseCard.vue';

// Vue 组件
export default {
  components: {
    CourseCard
  },

  setup() {
    const dialogVisible = ref(false);
    const clickedCardIndex = ref(null);
    const courses = reactive([]);

    const categories = ['music', 'dance', 'draw', 'calligraphy', 'design', 'sculpture', 'photo', 'musical'];

    const handleCardClick = async (idx) => {
      // 获取类别的名称
      const clickedCategory = categories[idx];
      // 使用axios向服务器发出请求，获取课程数据
      try {
        const response = await axios.get(`http://localhost:3000/courses?type=${clickedCategory}`);
        courses.value = response.data; // 填充课程数据
        this.searchResults = courses;
      } catch (error) {
        console.error(error);
        this.$message({
          message: `加载分类 ${clickedCategory} 的课程失败`,
          type: 'error',
          duration: 3000
        });
      }

      clickedCardIndex.value = idx; // 设置为点击的卡片的下标
      dialogVisible.value = true; // 打开对话框
    };

    const handleClose = (done) => {
      dialogVisible.value = false;
      done();
    };

    return {
      dialogVisible,
      clickedCardIndex,
      courses,
      categories,
      handleCardClick,
      handleClose,
    };
  },


  data() {
    return {
      username: null,
      form: {
        name: '',
        phone: '',
        email: '',
        content: ''
      },
      hotList: [], // 热门课程列表
      carouselItems: [] , //新闻图片列表
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
      ],
      course_categories: [
        {image: require('@/assets/icon/icons8-music-100.png'),alt: '音乐',description: '音乐' },
        {image: require('@/assets/icon/icons8-ballet-dancer-100.png'),alt: '舞蹈',description: '舞蹈' },
        {image: require('@/assets/icon/icons8-draw-100.png'),alt: '绘画',description: '绘画' },
        {image: require('@/assets/icon/icons8-calligraphy-100.png'),alt: '书法',description: '书法' },
        {image: require('@/assets/icon/icons8-design-100.png'),alt: '设计',description: '设计' },
        {image: require('@/assets/icon/icons8-statue-of-liberty-100.png'),alt: '雕塑',description: '雕塑' },
        {image: require('@/assets/icon/icons8-photo-100.png'),alt: '摄影',description: '摄影' },
        {image: require('@/assets/icon/icons8-violin-100.png'),alt: '乐器',description: '乐器' },
      // 其他类别数据...
      ],
      latestNews: [
          { title: "资讯标题1", date: "2024-05-10" },
          { title: "资讯标题2", date: "2024-05-09" },
          { title: "资讯标题2", date: "2024-05-09" },
          { title: "资讯标题2", date: "2024-05-09" },
          { title: "资讯标题2", date: "2024-05-09" },
          { title: "资讯标题2", date: "2024-05-09" },
          // 添加更多资讯
      ],
      searchResults: [],
      pagedResults: [],
      pageSize: 12,
      currentPage: 1
    };
  },
  created() {
    this.fetchCourses();
    this.setUserName();
    this.fetchMusicCourses();
  },
  
  methods: {
    fetchMusicCourses() {
        axios.get('http://localhost:3000/api/courses') // 确保使用正确的HTTP端点
          .then(response => {
            this.searchResults = response.data;
            this.handlePagination(); // 处理分页
          })
          .catch(error => {
            console.error(error);
            // 添加错误处理
          })
    },
    handlePagination() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedResults = this.searchResults.slice(start, end);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlePagination();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlePagination();
    },



    logout() {
      // 清除localStorage中的用户数据
      localStorage.removeItem('userRole');
      localStorage.removeItem('userToken');
      // 使用Vue Router重定向到登录页面
      this.$router.push({ name: 'Login' });
    },
      setUserName()
      {
        // 从 localStorage 获取用户角色
        this.username = localStorage.getItem('userName');
        console.log('Current user name:', this.username);
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('提交成功!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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
            this.carouselItems = this.hotList;
            console.log(`hotlist: ${this.carouselItems}`);

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

.annotation-container {
  display: flex;
  justify-content: space-between; /* 使每个项目之间的间隔平均分布 */
}

.annotation-item {
  flex-basis: 33%; /* 可根据需要调整，这将设置每个项目的基础宽度 */
}

.grid-content {
  border-radius: 4px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.grid-content.date {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.grid-content.title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  text-align: right;
}

.quick-access-section{
  background-image: url('~@/assets/background.jpg');
}

.contact-form {
  width: 60%; /* 调整表单的宽度，你可以使用任何合适的单位，如 px, em, % 等 */
  margin: 0 auto; /* 水平居中表单，这在你设置了表单宽度为具体数值时才有效 */
}

.submit-button {
  /* display: flex; */
  justify-content: center;
  margin-top:20px;
  margin-bottom:20px;
}
.contact-title
{
  margin-top: 20px;
}


.logout-button {
  padding: 5px 15px;
  color: #fff;
  background-color: #1767fd; /* 按钮背景颜色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  margin-left:20px;
}

.logout-button:hover {
  background-color: #111aa0;
}
</style>