<template>
  <div class="course-list">
    <el-row :gutter="20">
      <CourseCard
        v-for="course in pagedCourses"
        :key="course.id"
        :searchResults="[course]"
      >
        <template #extra>
          <el-button type="primary" @click="editCourse(course)">编辑课程</el-button>
          <el-button type="primary" @click="deleteCourse(course)">删除课程</el-button>
        </template>
      </CourseCard>
    </el-row>
    
    <!-- Modal window for course editing -->
    <el-dialog title="编辑课程" v-model="showModal">
      <el-form ref="formCourse" :model="selectedCourse" :rules="rules" label-position="top" @submit.prevent="updateCourse">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="课程标题" prop="title">
              <el-input v-model="selectedCourse.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程ID" prop="course_id">
              <el-input v-model="selectedCourse.course_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="课程描述" prop="description">
          <el-input type="textarea" v-model="selectedCourse.description"></el-input>
        </el-form-item>

        <el-form-item label="课程照片">
          <el-upload
            class="upload-demo"
            ref="uploader"  
            action="http://localhost:3000/upload"
            accept=".png, .jpeg, .jpg"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :data="getUploadData"
            :auto-upload="false"  
          >
            <el-button size="small">选取文件</el-button>
          </el-upload>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="教师姓名" prop="teacher">
              <el-input v-model="selectedCourse.teacher"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教师ID" prop="teacher_id">
              <el-input v-model="selectedCourse.teacher_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="课程时长(分钟)" prop="duration">
              <el-input-number v-model="selectedCourse.duration" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开课时间" prop="date">
              <el-input type="datetime-local" v-model="selectedCourse.date"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="课程价格(元)" prop="price">
              <el-input-number v-model="selectedCourse.price" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="课程分类" prop="courseCategory">
              <el-select v-model="selectedCourse.courseCategory" placeholder="请选择">
                <el-option
                  v-for="item in ['音乐', '舞蹈', '绘画', '书法', '设计', '雕塑', '摄影', '乐器']"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="难度评级" prop="difficultyLevel">
              <el-select v-model="selectedCourse.difficultyLevel" placeholder="请选择">
                <el-option
                  v-for="level in ['初级', '中级', '高级']"
                  :key="level"
                  :label="level"
                  :value="level">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="推荐年龄" prop="recommendedAge">
              <el-input v-model="selectedCourse.recommendedAge" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="closeModal">关闭窗口</el-button>
      </el-form>
    </el-dialog>

    <transition name="fade">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="courses.length"
      ></el-pagination>
    </transition>
  </div>
</template>

<script>
import CourseCard from './CourseCard.vue';
import axios from 'axios';

export default {
  name: 'CourseManagerComponent',
  components: {
    CourseCard,
  },
  data() {
    return {
      courses: [],
      showModal: false,
      selectedCourse: {},
      pagedCourses: [],
      pageSize: 12,
      currentPage: 1,
      fileList: [],
    };
  },
  created() {
    this.fetchCourses();
  },
  watch: {
    courses() {
      this.handlePagination();
    },
    currentPage() {
      this.handlePagination();
    },
    pageSize() {
      this.handlePagination();
    }
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses')
        .then(response => {
          if (Array.isArray(response.data)) {
            this.courses = response.data;
          } else {
            console.error('Invalid API response');
            this.$message.error("无效的API响应");
          }
        })
        .catch(error => {
          console.error(error);
          this.$message.error("获取课程列表失败");
        });
    },
    handlePagination() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedCourses = this.courses.slice(start, end);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.handlePagination();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlePagination();
    },
    editCourse(course) {
      this.selectedCourse = course ? { ...course } : {}; // 确保 course 不为空
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      // this.selectedCourse = null; // 关闭窗口后重置表单
      this.fileList = []; // 重置文件列表
    },
    updateCourse() {
      axios.put(`http://localhost:3000/api/courses/${this.selectedCourse.id}`, this.selectedCourse)
        .then(() => {
          const index = this.courses.findIndex(course => course.id === this.selectedCourse.id);
          console.log(index)
          if (index !== -1) {
            this.courses[index] = this.selectedCourse; // 在 Vue 3 中，直接这样更新是响应式的
            this.handlePagination(); // 重新计算分页以反映更新
          }
          this.$message.success('课程更新成功');
          this.closeModal();
        })
        .catch(error => {
          console.error(error);
          this.$message.error('课程更新失败');
        });
    },
    deleteCourse(course) {
      axios.delete(`http://localhost:3000/api/courses/${course.id}`)
        .then(() => {
          const index = this.courses.findIndex(c => c.id === course.id);
          if (index !== -1) {
            this.courses.splice(index, 1);
          }
          this.$message.success('删除成功');
        })
        .catch(error => {
          console.error(error);
          this.$message.error('删除失败');
        });
    },
    handleExceed() {
      this.$message.warning('文件数量超出限制');
    },
    beforeUpload(file) {
      this.fileList = [file];
      return false; // 不自动上传
    },
    getUploadData() {
      return { courseId: this.selectedCourse.course_id };
    },
  }
};
</script>

<style scoped>
.modal {
  /* Add your modal styles */
}
</style>