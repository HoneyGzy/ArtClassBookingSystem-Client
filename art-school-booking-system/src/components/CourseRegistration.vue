<template>
    <!-- 使用el-row和el-col创建水平布局 -->
    <el-row :gutter="20">
      <!-- 左侧部分显示课程卡片与分页 -->
      <el-col :span="15">
        <el-main>
          <h2 class="course-title">已经预约的课程</h2>
            <!-- 为课程卡片的容器添加flex样式 -->
            <div class="course-cards-container">
              <CourseCard
                v-for="course in pagedResults"
                :key="course.id"
                :searchResults="[course]">
              </CourseCard>
            </div>
    
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
        </el-main>
      </el-col>

      <el-divider direction="vertical"></el-divider>
     
      <!-- 右侧部分显示已经预约的课程、个人信息表单和支付信息 -->
      <el-col :span="7">
        <el-main>
          <div class="course-selection">
            <h2 class="course-title">已经预约的课程</h2>
            <el-select v-model="selectedCourse" @change="updateTotalPrice" placeholder="请选择" class="course-menu">
              <el-option
                v-for="course in courses"
                :key="course.id"
                :label="course.courseTitle + ' - ' + formatCurrency(course.price)"
                :value="course.id">
              </el-option>
            </el-select>
          </div>
    
          <h2>价格总计: {{ formatCurrency(totalPrice) }}</h2>
    
          <el-form class="registration-form" >
            <form @submit.prevent="handleSubmit()">
              <h2>填写个人信息</h2>
              <el-input v-model="registrationInfo.name" placeholder="姓名" required class="form-input"></el-input>
              <el-input v-model="registrationInfo.email" type="email" placeholder="邮箱" required class="form-input"></el-input>
              <el-input v-model="registrationInfo.notes" type="textarea" placeholder="备注" class="form-input"></el-input>
              <el-button type="primary" native-type="submit">提交</el-button>
            </form>
          </el-form>
    
          <el-dialog v-model="showPaymentScreen" class="payment-dialog">
            <h2 class="payment-title">支付详情</h2>
            <p class="payment-detail">课程: {{ courseTitle }}</p> 
            <p class="payment-detail">购买人姓名: {{ registrationInfo.name }}</p> 
            <p class="payment-detail">邮箱: {{ registrationInfo.email }}</p>  
            <!-- 在这里集成实际的支付系统组件-->
            <p class="payment-instruction">请继续以完成支付...</p>
            <el-button class="payment-button" type="primary" @click="processPayment(true,courseTitle)">支付成功</el-button>
            <el-button class="payment-button" type="danger" @click="processPayment(false,courseTitle)">支付失败</el-button>
            <template v-slot:footer>
              <el-button class="close-button" @click="showPaymentScreen = false">关闭</el-button>
            </template>
          </el-dialog>
        </el-main>
      </el-col>
    </el-row>
</template>

<script>
import axios from 'axios';
import CourseCard from './CourseCard.vue';


  export default {
    name: 'CourseRegistration',
    components: {
     CourseCard,
    },
    data() {
      return {
        courses: [],
        selectedCourse: null,
        totalPrice: 0,
        courseTitle:null,
        registrationInfo: {
          name: '',
          email: '',
          notes: ''
        },
        showPaymentScreen: false,
        username:null,
        searchResults: [],
        pagedResults: [],
        pageSize: 4,
        currentPage: 1,

        
      };
    },
    created() {
      this.username = localStorage.getItem('userName');
      console.log(this.username)
      this.fetchCourses();
    },
    methods: {
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


      fetchCourses() {
        const users = this.username;
        axios.get(`http://localhost:3000/api/courseregistration`, {
          params: {
            username: users
          }
        })
        .then(response => {
          this.courses = response.data;
          this.searchResults = response.data
          this.handlePagination();
        })
        .catch(error => {
          console.error(error);
          // 添加错误处理
        })
      },
      
      updateTotalPrice() {
        if (this.selectedCourse) {
          const course = this.courses.find(c => c.id === this.selectedCourse);
          if (course) {
            this.totalPrice = course.price;
          } else {
            console.error(`Course with id ${this.selectedCourse} not found`);
          }
        }
      },
      formatCurrency(amount) {
        // 格式化货币的方法来代替过滤器
        const formatter = new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency: 'CNY',
          minimumFractionDigits: 2
        });
        return formatter.format(amount);
      },
      handleSubmit() {
        this.handleRegistration()
      },
      
      handleRegistration() {
        if (this.selectedCourse) {
          const course = this.courses.find(c => c.id === this.selectedCourse);
          if (course) {
            this.courseTitle = course.title;
          } else {
            console.error(`Course with id ${this.selectedCourse} not found`);
          }
        }
        // 处理注册逻辑...
        // 假设所有验证都通过了，并且用户的信息已经提交成功，我们将显示支付屏幕
        this.showPaymentScreen = true;
      },
      processPayment(success,courseTitle) {
        // 模拟支付过程
        if (success) {
          // 处理支付成功的情况
          this.$message({
            message: '支付成功！',
            type: 'success'
          });
          console.log(courseTitle)
          axios.post('http://localhost:3000/api/payment-successful', {
                params: {
                  courseTitle: courseTitle
              }
          }).then((response) => {
            // 处理服务器回应
            console.log(response);
          }).catch((error) => {
            // 在这里处理请求失败
            console.error(error);
          });
        } else {
          // 处理支付失败的情况
          this.$message({
            message: '支付失败',
            type: 'error'
          });
        }
        // 无论支付是否成功，都关闭支付对话框
        this.showPaymentScreen = false;
     }
    }
  };
  </script>
  
<style scoped>
  .el-divider--vertical {
    height: auto; /* 使分割线垂直延伸 */
  }
  .form-input {
    width: 100%;  /* 你可以将 100% 替换为具体的像素值或其他单位 */
    font-size: 16px;  /* 调整字体大小 */
  }
  
  .text-area {
    height: 200px;  /* 针对文本区域调整高度 */
  }
  .course-cards-container {
    display: flex; /* 设置flex布局 */
    flex-wrap: wrap; /* 允许换行 */
    justify-content: start; /* 从起点开始排列 */
  }
  .course-cards-container > * {
    flex: 0 0 25%; /* 每个卡片占据25%的宽度 */
    max-width: 25%; /* 设置最大宽度为25%，确保一行最多四个卡片 */
    box-sizing: border-box; /* 包括padding和border在内的宽度计算 */
  }
</style>