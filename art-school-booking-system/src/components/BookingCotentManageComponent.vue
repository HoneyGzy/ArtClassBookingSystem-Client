<template>
    <div class="booking-management">
      <el-table :data="bookings" style="width: 100%" :row-class-name="tableRowClassName" empty-text="暂无预约">
        <el-table-column prop="username" label="预约用户"></el-table-column>
        <el-table-column prop="courseId" label="课程ID"></el-table-column>
        <el-table-column prop="courseTitle" label="课程名称"></el-table-column>
        <el-table-column prop="reservationStatus" label="预约状态"></el-table-column>
        <el-table-column prop="courseTime" label="课程时间"></el-table-column>
        <el-table-column prop="paymentStatus" label="支付状态"></el-table-column>
        <el-table-column>
        <template v-slot:header>
            <el-input v-model="search" placeholder="搜索课程" />
        </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleManageBooking(scope.row)">管理预约</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name:'BookingCotentManageComponent',
    data() {
      return {
        bookings: [], // 这里需要加载你的预约课程数据
        search: '',
        useusername:null,
        courses:[],
      };
    },
    created() {
        this.useusername = localStorage.getItem('userName');
        this.fetchCourses();
    },
    methods: {  
        handleManageBooking(row) {
        // 在这里添加管理某个预约的代码
        console.log(`管理课程 ${row.id} 的预约`);
        },
        fetchCourses() {
            axios.get('http://localhost:3000/api/getAllcourseregistration') // 确保使用正确的HTTP端点
            .then(response => {
                this.bookings = response.data;
            })
            .catch(error => {
                console.error(error);
                // 添加错误处理
            })
        },
    },
  };
  </script>
  
  <style scoped>
  .booking-management {
    margin: 20px;
  }
  </style>

