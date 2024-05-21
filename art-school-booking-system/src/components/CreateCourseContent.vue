<template>
  <div id="course-create">
    <!-- <h2 class="management-title">创建课程</h2> -->
    <el-form class="course-form" ref="formCourse" :model="formCourse" :rules="rules" label-position="top" @submit.prevent="saveCourse">
      <h3>添加新课程</h3>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="课程标题" prop="title">
            <el-input v-model="formCourse.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 新增的课程ID输入组件 -->
          <el-form-item label="课程ID" prop="course_id">
            <el-input v-model="formCourse.course_id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="课程描述" prop="description">
        <el-input type="textarea" v-model="formCourse.description"></el-input>
      </el-form-item>

      <!-- 课程照片上传组件 -->
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
            <el-input v-model="formCourse.teacher"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
              <!-- 新增的教师ID输入组件 -->
          <el-form-item label="教师ID" prop="course_id">
            <el-input v-model="formCourse.teacher_id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="课程时长(分钟)" prop="duration">
            <el-input-number v-model="formCourse.duration" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开课时间" prop="date">
            <el-input type="datetime-local" v-model="formCourse.date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程价格(元)" prop="price">
            <el-input-number v-model="formCourse.price" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 新增的课程分类，难度级别和推荐年龄输入组件 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="课程分类" prop="courseCategory">
            <el-select v-model="formCourse.courseCategory" placeholder="请选择">
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
            <el-select v-model="formCourse.difficultyLevel" placeholder="请选择">
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
            <el-input v-model="formCourse.recommendedAge" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary" native-type="submit">添加课程</el-button>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios'; // 引入axios

export default {
  name: 'CreateCourseContent',
  data() {
    return {
      courses: [],
      formCourse: {
        title: '',
        description: '',
        photo: null,  // 用于在提交时上传的文件
        course_id: '',
        courseCategory: '',
        difficultyLevel: '',
        recommendedAge:'',
        teacher_id:''

      },
      fileList: [],
      
    }
  },
  methods: {
    getUploadData() {
      return { course_id: this.formCourse.course_id };
    },

    handleExceed(files) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个。`);
    },
    beforeUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isJPEG || isPNG) && isLt5M;
    },

    handleAvatarSuccess(response, file) {
      console.log(response,file)
      this.isUploaded = true;  // 当上传成功后，更改状态量
    },
  

    saveCourse() {
      // 先上传图片
      this.$refs.uploader.submit();
      axios.post('http://localhost:3000/api/create_courses', this.formCourse)
      .then(response => {
        console.log(response);
        this.courses.push(this.formCourse);
        this.formCourse = { title: '', description: '', teacher: '', duration: '', date: '', price: '' };
        this.editingCourse = null;

        // 使用 Element Plus' Message 组件来显示成功的消息
        this.$message({
          message: '课程保存成功',
          type: 'success',
          duration: 3000
        });
      })
      .catch(error => {
        console.error(error);
        let errorMessage = '课程保存失败'; 

        // 如果返回的是价格长度过长的错误
        if (error.response && error.response.data && error.response.data.error === '价格长度过长') {
          errorMessage = '价格范围为0-999, 请删减后再试';
        }
        this.$message({
          message: errorMessage,
          type: 'error',
          duration: 3000
        });
      });
    }

  }
}
</script>


<style scoped>
/* 在此处添加自定义样式 */
.management-title {
  font-size: 30px;
  color: #20a0ff;
  text-align: center;
  margin-bottom: 40px;
}

.course-form {
  max-width: 800px;
  margin: 0 auto;
}

.el-form-item__label {
  color: #606266;
  font-weight: 600;
}

.el-input, .el-input-number {
  width: 100%;
}

.el-form-item__content {
  line-height: normal;
}

.el-row {
  margin-bottom: 18px;
}

.el-button {
  margin-top: 20px;
}

.el-button--primary {
  background-color: #20a0ff;
  border-color: #20a0ff;
}

.avatar-uploader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-preview {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 10px;
  text-align: center;
  line-height: 98px;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
}
</style>
