<template>
  <el-container class="course-registration" direction="vertical">
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

    <el-dialog v-model="showPaymentScreen" title="支付" class="payment-dialog">
      <h2 class="payment-title">支付详情</h2>
      <p class="payment-detail">课程: {{ courseTitle }}</p> 
      <p class="payment-detail">购买人姓名: {{ registrationInfo.name }}</p> 
      <p class="payment-detail">邮箱: {{ registrationInfo.email }}</p> 
      <!-- 在这里集成实际的支付系统组件 -->
      <p class="payment-instruction">请继续以完成支付...</p>
      <el-button class="payment-button" type="primary" @click="processPayment">支付 {{ formatCurrency(totalPrice) }}</el-button>
      <template v-slot:footer>
        <el-button class="close-button" @click="showPaymentScreen = false">关闭</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'CourseRegistration',
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
        
      };
    },
    created() {
      this.username = localStorage.getItem('userName');
      console.log(this.username)
      this.fetchCourses();
    },
    methods: {
      fetchCourses() {
        const users = this.username;
        axios.get(`http://localhost:3000/api/courseregistration`, {
          params: {
            username: users
          }
        })
        .then(response => {
          this.courses = response.data;
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
      processPayment() {
        // 在这里处理支付逻辑，例如调用支付API
        alert('支付流程启动...（在这里集成真实的支付系统）');
        // 支付成功后，清理表单或重定向到其他页面
      }
    }
  };
  </script>
  
<style scoped>
  .course-selection {
    display: flex;
    align-items: center;
  }

  .course-title {
    margin-right: 10px;
    white-space: nowrap;
  }

  .course-menu {
    flex-grow: 1;
  }

  .el-container {
  width: 25%;  /* 设置宽度为50% */
  margin: 0 auto;  /* 居中对齐 */
  }

  .form-input {
    width: 100%;  /* 你可以将 100% 替换为具体的像素值或其他单位 */
    font-size: 16px;  /* 调整字体大小 */
  }
  
  .text-area {
    height: 200px;  /* 针对文本区域调整高度 */
  }

  .payment-dialog {
    background: #f5f5f5;
    border-radius: 10px;
    color: #333;
  }
  .payment-title {
    color: #1f2d3d;
    font-size: 24px;
  }
  .payment-detail {
    color: #606266;
    font-size: 18px;
  }
  .payment-instruction {
    color: #909399;
    font-size: 16px;
  }
  .payment-button {
    background-color: #f7b824;
    color: white;
  }
  .close-button {
    background-color: #e6a23c;
    color: white;
  }
</style>