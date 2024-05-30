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
        <span class="login-prompt">已有账号？</span>
        <el-button class="login" type="primary" @click="handleLogin">立即登录</el-button>
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
                <div class="carousel-item" v-for="(subItem, subIndex) in item" :key="`subItem-${subIndex}`" @click="handleImageClick(subItem)">
                  <img :src="subItem.image" alt="" class="carousel-item-img">
                  <p>{{ subItem.title }}</p>
                </div>        
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
       <!-- 课程模态框 -->
      <el-dialog
        v-model="isCourseDialogVisible"
        width="30%"
        :before-close="handleCourseDialogClose">
        <!-- 把searchResults作为Prop传递给CourseCard组件 -->
          <CourseSingleCard :course="HotCourseInfo" >
          </CourseSingleCard>
        <template #footer>
        <el-button @click="isCourseDialogVisible = false">关闭</el-button>
        </template>
      </el-dialog>

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
        <!-- 新闻 -->
        <div class="annotation-item">
          <h2 class="section-title">新闻</h2>
          <el-carousel :interval="3000">
            <el-carousel-item
              v-for="item in carouselItems"
              :key="item.id"
              @click="viewNewsPicDetail(item)"
            >
              <img :src="item.image_url" class="carousel-item-img" alt="Image" style="cursor: pointer;" />
            </el-carousel-item>
          </el-carousel>
          <el-dialog
            title="新闻详情"
            v-model="newsPicDialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div v-if="currentNewsPics">
              <p><strong>日期：</strong>{{ currentNewsPics.publish_date }}</p>
              <p><strong>标题：</strong>{{ currentNewsPics.title }}</p>
              <p><strong>内容：</strong>{{ currentNewsPics.content }}</p>
            </div>
            <template #footer >
              <el-button @click="newsPicDialogVisible = false">关闭</el-button>
            </template>          
          </el-dialog>
        </div>

        <!-- 最新资讯 -->
        <div class="annotation-item">
          <h2 class="section-title">最新资讯</h2>
          <!-- 在这里添加您的资讯内容 -->
          <el-list class="el-list-news">
            <el-list-item
              v-for="(news, index) in paginatedNews"
              :key="index"
              class="news-item"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content date">{{ news.date }}</div>
                </el-col>
                <el-col :span="18">
                  <div
                    class="grid-content title"
                    @click="viewNewsDetail(news)"
                    style="cursor: pointer; color: blue; text-decoration: underline;"
                  >
                    {{ news.title }}
                  </div>
                </el-col>
              </el-row>
            </el-list-item>
            <el-pagination
              v-if="latestNews.length > 5"
              layout="prev, pager, next"
              :total="latestNews.length"
              :page-size="newsPerPage"
              @current-change="handlePageChange"
            ></el-pagination>
          </el-list>

          <!-- 资讯详情模态框 -->
          <el-dialog
            title="资讯详情"
            v-model="newsdialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div v-if="currentInfo">
              <p><strong>日期：</strong>{{ currentInfo.date }}</p>
              <p><strong>标题：</strong>{{ currentInfo.title }}</p>
              <p><strong>内容：</strong>{{ currentInfo.content }}</p>
            </div>
            <template #footer >
              <el-button @click="newsdialogVisible = false">关闭</el-button>
            </template>
          </el-dialog>
        </div>
        
        <!-- 最新通知 -->
        <div class="annotation-item">
          <h2 class="section-title">最新通知</h2>
          <el-list class="el-list-news">
            <el-list-item
              v-for="(news, index) in paginatedAnnotations"
              :key="index"
              class="news-item"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content date">{{ news.date }}</div>
                </el-col>
                <el-col :span="18">
                  <div
                    class="grid-content title"
                    @click="viewNewsDetail(news)"
                    style="cursor: pointer; color: blue; text-decoration: underline;"
                  >
                    {{ news.title }}
                  </div>
                </el-col>
              </el-row>
            </el-list-item>
            <el-pagination
              v-if="latestAnnotation.length > 5"
              layout="prev, pager, next"
              :total="latestAnnotation.length"
              :page-size="newsPerPage"
              @current-change="handlePageChange"
            ></el-pagination>
          </el-list>

          <!-- 通知公告模态框 -->
          <el-dialog
            title="通知详情"
            v-model="annotationdialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div v-if="currentAnnotations">
              <p><strong>日期：</strong>{{ currentAnnotations.date }}</p>
              <p><strong>标题：</strong>{{ currentAnnotations.title }}</p>
              <p><strong>内容：</strong>{{ currentAnnotations.content }}</p>
            </div>
            <template #footer >
              <el-button @click="annotationdialogVisible = false">关闭</el-button>
            </template>
          </el-dialog>
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
import CourseSingleCard from './CourseCardSingle.vue';




// Vue 组件
export default {
  components: {
    CourseSingleCard
  },
  data() {
    return {
      dialogVisible: false,
      isCourseDialogVisible: false,
      newsdialogVisible: false,
      annotationdialogVisible:false,
      newsPicDialogVisible: false,
      
      currentNewsPics: null,
      currentInfo: null,
      currentAnnotations: null,
    
      clickedCardIndex: null,
      categoryData: [],
      HotCourseInfo:{},
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
      latestNews: [],
      latestAnnotation:[],
      //currentPage: 1,
      newsPerPage: 5,

      searchResults: [],
      pagedResults: [],
      pageSize: 12,
      currentPage: 1,

      isReserveDialogVisible: false,
      selectedCourse: {},

      fastentrydialogVisible: false, // 控制模态框的显示和隐藏
      dialogContent: '', // 模态框中显示的内容
      currentIndex: null,
    };
  },
  created() {
    this.fetchCourses();
    this.fetchNews();
    this.fetchNewsPic();
    this.fetchAnnotations();
    this.setUserName();
    // this.fetchMusicCourses();
    this.useusername = localStorage.getItem('userName');
  },

  computed: {
    dialogWidth() {
      switch (this.currentIndex) {
        case 0:
          return '80%';
        case 1:
          return '30%';
        // 在这里为更多的索引设置宽度
        default:
          return '50%';
      }
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.newsPerPage;
      const end = start + this.newsPerPage;
      return this.latestNews.slice(start, end);
    },
    paginatedAnnotations() {
      const start = (this.currentPage - 1) * this.newsPerPage;
      const end = start + this.newsPerPage;
      return this.latestAnnotation.slice(start, end);
    },
  },
  
  methods: {
    handleLogin() {
        this.$router.push('/login');
      },

    viewNewsPicDetail(item){
        this.currentNewsPics =item;
        console.log(item)
        this.newsPicDialogVisible = true;
    },

    handlePageChange(page) {
      this.currentPage = page;
    },

    viewNewsDetail(news) {
      // 在这里处理查看详情的逻辑，比如打开一个模态框展示详情内容
      this.currentInfo = news;
      this.newsdialogVisible = true
      console.log(news); // 你可以替换成你实际的查看详情逻辑
    },
    async handleImageClick(subItem) {
      this.HotCourseInfo = subItem;
      this.isCourseDialogVisible = true;
      try {
        // 等待axios请求完成
        const response = await axios.get(`http://localhost:3000/api/courses/${subItem.course_id}`);
        this.HotCourseInfo = response.data; // 假设返回的数据中即包含课程信息
        console.log(response.data);
      } catch (error) {
        console.error('获取课程信息失败', error);
        this.isCourseDialogVisible = false;
      }
    },
    handleCourseDialogClose() {
      this.isCourseDialogVisible = false;
      this.HotCourseInfo = {};
    },
    handleCardClick(idx) {
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
    openReserveDialog(course) {
      console.log(course)
      this.selectedCourse = course;
      this.isReserveDialogVisible = true;
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
          // 如果验证成功，进行表单提交
          axios.post('http://localhost:3000/api/contact', this.form)
            .then(response => {
              console.log(response)
              this.$message({
                message: '提交成功！',
                type: 'success'
              });
              // 清空表单
              this.$refs[formName].resetFields();
            })
            .catch(error => {
              this.$message({
                message: '提交失败，请稍后再试。',
                type: 'error'
              });
              console.error(error);
            });
        } else {
          console.log('验证失败，请检查输入');
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
          // this.carouselItems = this.hotList;
          // console.log(`hotlist: ${this.carouselItems}`);

          let chunkSize = 3;
          for (let i = 0; i < this.hotList.length; i += chunkSize) {
            this.chunkedHotList.push(this.hotList.slice(i,i+chunkSize));
          }
        })
        .catch(error => {
          console.error(error);
        })
    },
    fetchNewsPic() {
      axios.get('http://localhost:3000/api/news_images')
        .then(response => {
          // 判断API返回的数据是否为数组
          if(!response.data || !Array.isArray(response.data)) {
            console.error("Invalid API response");
            return;
          }
          // 使用map方法处理每一条新闻信息
          this.carouselItems = response.data.map(item => {
            // 构建图片的完整URL，替换其中的反斜杠以符合URL的格式
            const imageURL = `http://localhost:3000/${item.image_path.replace(/\\/g, "/")}`;

            console.log(`News title: ${item.title}`);
            console.log(`Image URL: ${imageURL}`);

            // 返回处理后的对象，包含完整的图片URL和其他字段
            return {
              ...item,
              image_url: imageURL
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    },

    fetchNews() {
      axios.get('http://localhost:3000/api/news')
        .then(response => {
          this.latestNews = response.data.map(news => ({
            ...news,
            date: this.formatDate(news.date)
          }));
        })
        .catch(error => {
          console.error("获取资讯列表失败：", error);
        });
    },
    fetchAnnotations(){
      axios.get('http://localhost:3000/api/annotations')
        .then(response => {
          this.latestAnnotation = response.data.map(news => ({
            ...news,
            date: this.formatDate(news.date)
          }));
        })
        .catch(error => {
          console.error("获取资讯列表失败：", error);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleClick(index) {
      this.currentIndex = index; // 记录当前点击的index
      this.dialogContent = this.cards[index].content; // 设置模态框中显示的内容
      this.fastentrydialogVisible = true; // 显示模态框
      
    },
    async submitReserve() {
      try {
        // 提取出用户名和课程ID
        const users = this.useusername;
        const courseId = this.selectedCourse.course_id;
        const courseTitle = this.selectedCourse.title;

        // 发送预约请求
        const response = await axios.post('http://localhost:3000/api/postReservation', {
          users,
          courseId,
          courseTitle
        });

        // 判断预约状态，如果预约成功则使用你的原始逻辑，如果预约失败则使用新的逻辑
        if (response.data.status === "error") {
          // 抛出错误，调用catch块中的错误处理
          throw response.data.message;
        } else {
          // 解析响应
          const { reservationStatus, courseTime } = response.data;

          // 更新预约状态
          this.isReserveDialogVisible = false;
          this.reservationStatus = reservationStatus;
          this.courseTime = courseTime;

          // 显示成功消息
          this.$message.success('预约成功！等待管理员处理');
        }

      } catch (error) {
        console.error(error);
        // 使用后端返回的错误消息
        this.$message.error(error);
      }
    }
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

.login-prompt {
  margin-right: 5px;
  color: #333; /* 可根据需要调整字体颜色 */
}

.login {
  color: white; /* 可根据需要调整按钮字体颜色 */
  background-color: #409EFF; /* Element Plus 默认的主要颜色 */
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

/* .carousel-item-img {
  height: 55%; 
  width: auto;
  object-fit: cover;
} */

.el-carousel, .el-carousel-item {
  height: auto; /* 或者一个具体的值，比如 '300px' */
}

.carousel-item-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

/* .carousel-item {
  width: 33.33%;
} */

.carousel-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-item-img {
  width: 97%;
  height: auto;
  object-fit: cover; /* 保持图像等比例缩放并裁剪 */
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