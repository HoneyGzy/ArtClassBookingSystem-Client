<template>
  <el-row :gutter="20">
    <CourseCard
        v-for="course in pagedCourses"
        :key="course.id"
        :searchResults="[course]"
    >
      <template #extra>
        <el-button type="primary" @click="openReserveDialog(course)">预约课程</el-button>
      </template>
    </CourseCard>
  </el-row>
  <transition name="fade">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="courses.length">
    </el-pagination>
  </transition>
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
import CourseCard from './CourseCard.vue'
import axios from 'axios';

export default {
  name: 'CourseListComponent',
  components: {
    CourseCard
  },
  data() {
    return {
      courses: [],
      isReserveDialogVisible: false,
      selectedCourse: {},
      username: null,
      pagedCourses:null,
      pageSize: 12,
      currentPage: 1
    }
  },
  created() {
    this.fetchCourses();
    this.useusername = localStorage.getItem('userName');
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses') // 确保使用正确的HTTP端点
        .then(response => {
          this.courses = response.data;
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
      this.pagedCourses = this.courses.slice(start, end);
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
      this.selectedCourse = course;
      this.isReserveDialogVisible = true;
    },
    resetReserveDialog() {
      this.selectedCourse = {};
    },
    async submitReserve() {
    try {
      // 提取出用户名和课程ID
      const users = this.useusername;
      const courseId = this.selectedCourse.id;
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
        this.$message.success('预约成功！');
      }

    } catch (error) {
      console.error(error);
      // 使用后端返回的错误消息
      this.$message.error(error);
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