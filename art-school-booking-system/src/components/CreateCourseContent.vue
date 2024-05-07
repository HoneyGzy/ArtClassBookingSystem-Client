<!-- <template>
  <div id="course-create">
    <h2 class="management-title">创建课程</h2>
    <form class="course-form" @submit.prevent="saveCourse">
      <h3>{{ editingCourse !== null ? '编辑课程' : '添加新课程' }}</h3>
      <input type="text" v-model="formCourse.title" placeholder="课程标题">
      <textarea v-model="formCourse.description" placeholder="课程描述"></textarea>
      <input type="text" v-model="formCourse.teacher" placeholder="教师姓名">
      <input type="number" v-model="formCourse.duration" placeholder="课程时长(分钟)">
      <input type="datetime-local" v-model="formCourse.date" placeholder="课程时间">
      <input type="number" v-model="formCourse.price" placeholder="课程价格">
      <button type="submit">{{ editingCourse !== null ? '保存课程' : '添加课程' }}</button>
    </form>
  </div>
</template> -->

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
          <el-form-item label="教师姓名" prop="teacher">
            <el-input v-model="formCourse.teacher"></el-input>
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

      <!-- 新增的课程ID输入组件 -->
      <el-form-item label="课程ID" prop="course_id">
        <el-input v-model="formCourse.course_id"></el-input>
      </el-form-item>
      
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
        course_id: ''
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


      axios.post('http://localhost:3000/courses', this.formCourse)
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

<!-- CSS 样式见上一回 -->
<!-- 
<style scoped>
#course-create {
  padding: 20px;
}

.management-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 30px;
}

.course-form {
  margin-bottom: 30px;
}

.course-form input,
.course-form textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.course-form button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.course-form button:hover {
  background-color: #66b1ff;
}

.course-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.course-item {
  width: calc(50% - 20px);
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.1);
}

.course-item h3,
.course-item p {
  margin-top: 10px;
  margin-bottom: 10px;
}

.course-item button {
  display: inline-block;
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.course-item button:hover {
  background-color: #ff7875;
}

.course-list {
  /* Flexbox solution: */
  display: flex;
  flex-wrap: wrap; /* This allows the items to wrap to the next line if the container width is too small */
  justify-content: space-between; /* This spaces the items evenly within the container */

  /* Or use Grid solution: */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* This creates as many 300px columns as possible and distributes the remaining space evenly */
  gap: 10px; /* This adds spacing between the grid items */
}
.course-item {
  flex: 0 0 calc(33.33% - 10px); /* Flexbox solution: This sizes the items to take up one third of the container's width minus the 10px gap */
  margin-bottom: 10px; /* This adds spacing below the items */
}
</style> -->