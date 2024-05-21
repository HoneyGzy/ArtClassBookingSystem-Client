<template>
  <div class="booking-management">
    <el-table :data="bookings" style="width: 100%" :row-class-name="tableRowClassName" empty-text="暂无已成功预约">
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
  <!-- 模态框 -->
  <el-dialog v-model="dialogVisible" title="管理预约" width="20%">
    <el-form :model="form">
      <el-form-item label="预约状态">
        <el-select v-model="form.reservationStatus" placeholder="请选择">
          <el-option label="预约成功" value="预约成功"></el-option>
          <el-option label="预约失败" value="预约失败"></el-option>
          <!-- 其他状态选项 -->
        </el-select>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-select v-model="form.paymentStatus" placeholder="请选择">
          <el-option label="已支付" value="已支付"></el-option>
          <el-option label="未支付" value="未支付"></el-option>
          <!-- 其他状态选项 -->
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateBookingStatus">确 定</el-button>
    </template>
  </el-dialog>
</template>
  
<script>
import axios from 'axios';

export default {
  name:'AlreadyBookingCotentManageComponent',
  data() {
    return {
      bookings: [], // 这里需要加载你的预约课程数据
      search: '',
      useusername:null,
      courses:[],

      dialogVisible: false, // 控制模态框显示
      form: { // 表单数据
        reservationStatus: '',
        paymentStatus: '',
        courseid: ''
      },
    };
  },
  created() {
      this.useusername = localStorage.getItem('userName');
      this.fetchCourses();
  },
  methods: {  
    fetchCourses() {
        axios.get('http://localhost:3000/api/getAllAlreadycourseregistration') // 确保使用正确的HTTP端点
        .then(response => {
            this.bookings = response.data;
        })
        .catch(error => {
            console.error(error);
            // 添加错误处理
        })
    },

    handleManageBooking(row) {
      console.log(`管理课程 ${row.courseId} 的预约`);
      // 弹出模态框之前，用当前行的数据初始化表单
      this.form.reservationStatus = row.reservationStatus;
      this.form.paymentStatus = row.paymentStatus;
      this.form.courseid = row.courseId;
      this.dialogVisible = true; // 显示模态框
    },
    updateBookingStatus() {
      // 这里执行更新预约状态和支付状态的逻辑
      console.log(this.form); // 打印更新的状态，用于检查
      // 调用后端接口，更新数据库
      axios.post('http://localhost:3000/api/courseregistration_status', {
        params: {
          courseId: this.form.courseid, // 需要正确设置courseId
          // 其他需要的参数
        }
      })
      .then(response => {
        console.log(response);
        // 处理响应
        this.$message.success('更新成功！');
        this.refreshData(); // 刷新数据
      })
      .catch(error => {
        console.error(error);
        this.$message.error('更新失败！');
      })
      .finally(() => {
        this.dialogVisible = false; // 关闭模态框
      });
    },
    refreshData() {
      this.fetchCourses();
      // 在这里添加获取并显示数据的代码
      // 可以通过获取后台数据库的接口，获取最新的数据并更新到当前组件的 data 属性中，从而实现页面数据的实时刷新
    },
  },
};
</script>
  
<style scoped>
.booking-management {
  margin: 20px;
}
</style>

