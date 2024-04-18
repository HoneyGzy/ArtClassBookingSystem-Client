<template>
    <div class="course-registration">
      <h2>选择课程</h2>
      <select v-model="selectedCourse" @change="updateTotalPrice">
        <option v-for="course in courses" :key="course.id" :value="course">
          {{ course.name }} - {{ formatCurrency(course.price) }}
        </option>
      </select>
  
      <h2>价格总计: {{ formatCurrency(totalPrice) }}</h2>
  
      <form @submit.prevent="handleRegistration" class="registration-form">
        <h2>填写个人信息</h2>
        <input v-model="registrationInfo.name" placeholder="姓名" required />
        <input v-model="registrationInfo.email" type="email" placeholder="邮箱" required />
        <textarea v-model="registrationInfo.notes" placeholder="备注"></textarea>
        <button type="submit" class="submit-button">提交报名</button>
      </form>
  
      <div v-if="showPaymentScreen" class="payment-section">
        <h2>支付</h2>
        <!-- 在这里集成实际的支付系统组件 -->
        <p>请继续以完成支付...</p>
        <button @click="processPayment">支付 {{ formatCurrency(totalPrice) }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CourseRegistration',
    data() {
      return {
        courses: [
          { id: 1, name: '绘画初级课程', price: 300 },
          { id: 2, name: '雕塑入门课程', price: 500 },
          // 更多课程...
        ],
        selectedCourse: null,
        totalPrice: 0,
        registrationInfo: {
          name: '',
          email: '',
          notes: ''
        },
        showPaymentScreen: false
      };
    },
    methods: {
      updateTotalPrice() {
        if (this.selectedCourse) {
          this.totalPrice = this.selectedCourse.price;
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
      handleRegistration() {
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
  .course-registration .registration-form {
    margin-top: 20px;
  }
  
  .course-registration .submit-button {
    margin-top: 10px;
  }
  
  .course-registration .payment-section {
    margin-top: 40px;
  }
  </style>