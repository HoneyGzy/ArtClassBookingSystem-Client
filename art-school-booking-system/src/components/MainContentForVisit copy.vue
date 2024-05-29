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
        <el-button class="login" type="primary" @click="handleLogin">登录</el-button>
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
          <h2 class="section-title">艺术课程分类</h2>
          <!-- 网格布局 -->
          <el-row :gutter="20">
              <el-col :span="6" v-for="(item, idx) in categories" :key="idx">
                  <el-card class = "course-sorts" @click="handleCardClick(idx)">
                      <img :src="item.image" :alt="item.alt" class="category-image">
                      <p>{{ item.description }}</p>
                  </el-card>
              </el-col>
          </el-row>
        </div>
      </div>

      <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
        <span>{{ dialogContent }}</span>
          

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
// Vue 组件
export default {
  data() {
    return {
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
      categories: [
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
        dialogVisible: false,
        dialogContent: '',
    };
  },
  created() {
    this.fetchCourses();
  },
  methods: {
      handleLogin() {
        this.$router.push('/login');
      },
      handleCardClick(idx){
        console.log(idx)
        this.dialogVisible = true

        switch(idx) {
          case 0:
            this.dialogContent = '音乐分类：涉及到的主题广泛，从基础的音乐理论学习，到各种风格的音乐创作和编曲技巧，还有各种乐器的演奏方法等。无论你是想提高自己的音乐素养，还是想专业学习某一方面的技巧，这个分类都能满足你的需求。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 1:
            this.dialogContent = '舞蹈分类：这里有各种不同风格的舞蹈课程，比如流行的现代舞，优雅的芭蕾舞，还有各种民族舞蹈等。学习舞蹈不仅可以提高身体协调性，还可以充实生活，增加乐趣，也是一种很好的健身方式。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 2:
            this.dialogContent = '绘画分类：涵盖了各种技法和风格的绘画课程，包括素描，水彩，油画等。无论你是初学者，还是有一定基础的绘画爱好者，都可以在这里找到适合你的课程，学习和提高绘画技巧，发展个人艺术风格。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 3:
            this.dialogContent = '书法分类：我们提供了各种风格的书法课程，如行书，楷书，草书等。对中国传统文化有兴趣的人可以在这里学习到书法基础知识，并且通过实际写字的过程，更深入地理解和欣赏中华书法之美。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 4:
            this.dialogContent = '设计分类：课程内容包括平面设计，产品设计，UI设计，网页设计等。设计是一个综合性很强的领域，涉及到艺术感知，理论知识，技术应用等多个方面。在这里你可以全面提升设计能力，为未来的职业生涯打下坚实的基础。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 5:
            this.dialogContent = '雕塑分类：涉及到使用各种物料如陶瓷，木头，石头等进行雕塑的课程。雕塑是一个立体的艺术，需要考虑到形，空间，质地等多个方面。通过学习雕塑，你可以提高空间感知能力，同时也可以从中得到艺术的享受。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 6:
            this.dialogContent = '摄影分类：提供了从基础摄影技巧到高级后期处理的课程。摄影不仅可以记录生活，也可以是一种表达自我，发现美的方式。这里的课程会教你如何把看到的，想表达的，通过相机，呈现出来。如需浏览更多详情，请注册登录系统查看。';
            break;
          case 7:
            this.dialogContent = '乐器分类：涉及了各种乐器的演奏技巧，如钢琴，吉他，小提琴等。学习乐器不仅可以培养音乐素养，也可以锻炼协调性，增强记忆力。无论你是为了业余爱好，还是为了提升专业技能，都可以在这里找到适合你的课程。如需浏览更多详情，请注册登录系统查看。';
            break;
          default:
            break;
        }
        // const category = this.categories[idx]
      },
      handleClose() {
        this.dialogVisible = false; // 取消显示对话框
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
  background-image: url('~@/assets/art-school-booking-sys.png');
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
     /* transition: transform 0.3s ease-in-out; */
}
.course-sorts
{
  transition: transform 0.3s ease-in-out;

}

.course-sorts:hover {
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
</style>