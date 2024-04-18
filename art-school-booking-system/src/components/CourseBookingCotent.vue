<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="course in courses" :key="course.id">
      <el-card shadow="hover">
        <div>
          <div class="content-field">
            <el-tag size="small" effect="plain">课程名称</el-tag>
            <h2 class="el-typography">{{ course.title }}</h2>
          </div>
          
          <el-divider></el-divider>

          <div class="content-field">
            <span class="content-label content-tag"><el-tag size="small" effect="plain">描述</el-tag></span>
            <div class="content-description">{{ course.description }}</div>
          </div>
          
          <el-divider></el-divider>
          
          <div class="meta">
            <div class="content-field">
              <el-tag size="small" effect="plain">教师</el-tag>
              <el-tag>{{ course.teacher }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">时长</el-tag>
              <el-tag type="success">{{ course.duration }} 小时</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">日期</el-tag>
              <el-tag type="info">{{ new Date(course.date).toLocaleDateString() }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">价格</el-tag>
              <el-tag type="warning">¥{{ course.price }}</el-tag>
            </div>
            <div class="reserve-button">
            <el-button type="primary" @click="openReserveDialog(course)">预约课程</el-button>
          </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 预约课程模态框 -->
  <el-dialog
  v-model="isReserveDialogVisible"
  width="40%"
>
  <div class="dialog-container">
    <h2 class="dialog-title">课程预约</h2>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="dialog-item">
          <span class="dialog-item-title">课程名称：</span>
          <el-tag>{{ selectedCourse.title }}</el-tag>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dialog-item">
          <span class="dialog-item-title">教师：</span>
          <el-tag>{{ selectedCourse.teacher }}</el-tag>
        </div>
      </el-col>
    </el-row>
    <!-- 添加更多课程信息和预约表单 -->
  </div>
  <template #footer>
    <el-button class="dialog-button" @click="isReserveDialogVisible = false">取消</el-button>
    <el-button class="dialog-button" type="primary" @click="submitReserve">
      <i class="el-icon-check"></i>
      确认预约
    </el-button>
  </template>
</el-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseListComponent',
  data() {
    return {
      courses: [],
      isReserveDialogVisible: false,
      selectedCourse: {},
      username: null
    }
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses') // 确保使用正确的HTTP端点
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.error(error);
          // 添加错误处理
        })
    },
    openReserveDialog(course) {
      this.selectedCourse = course;
      this.isReserveDialogVisible = true;
    },
    resetReserveDialog() {
      this.selectedCourse = {};
    },
    async submitReserve() {
    try {
      // 提取出用户名和课程ID
      const username = this.$store.state.username;
      const courseId = this.selectedCourse.id;

      // 发送预约请求
      const response = await axios.post('/api/postReservation', {
        username,
        courseId
      });

      // 解析响应
      const { reservationStatus, courseTime } = response.data;

      // 更新预约状态
      this.isReserveDialogVisible = false;
      this.reservationStatus = reservationStatus;
      this.courseTime = courseTime;

      // 显示成功消息
      this.$message.success('预约成功！');

    } catch (error) {
      // 处理错误响应
      console.error(error);
      this.$message.error('预约失败，请稍后再试。');
    }
  }
},
}
</script>

<style scoped>
.content-field {
  display: flex;
  align-items: center;
  gap: 6px;
}

.el-typography {
  margin: 0;
}

.meta .content-field {
  margin-bottom: 0.5em;
}


.dialog-container {
  padding: 15px;
}

.dialog-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.dialog-item {
  font-size: 16px;
  color: #555;
  padding: 15px 0;
}

.dialog-item-title {
  font-weight: bold;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.dialog-button {
  margin-left: 15px;
  font-size: 16px;
  padding: 10px 20px;
}


</style>