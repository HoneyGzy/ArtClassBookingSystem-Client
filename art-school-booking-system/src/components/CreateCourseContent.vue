<template>
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

    <div class="course-list">
      <div 
        class="course-item" 
        v-for="(course, index) in courses"
        :key="index"
      >
        <h3 class="item-title">{{ course.title }}</h3>
        <p class="item-description">{{ course.description }}</p>
        <p class="item-teacher">教师：{{ course.teacher }}</p>
        <p class="item-duration">时长：{{ course.duration }} 分钟</p>
        <p class="item-date">时间：{{ new Date(course.date).toLocaleString() }}</p>
        <p class="item-price">价格：{{ course.price}} 元</p>
        <button @click="editCourse(index)">编辑课程</button>
        <button @click="deleteCourse(index)">删除课程</button>
      </div>
    </div>
  </div>
</template>

<!-- script部分和上例中的一样 -->

<!-- style部分请根据实际需要调整，比如为新的字段添加样式，调整布局等 -->

<script>

import axios from 'axios'; // 引入axios

export default {
  name: 'CreateCourseContent',
  data() {
    return {
      courses: [],
      formCourse: {
        title: '',
        description: ''
      },
      editingCourse: null
    }
  },
  methods: {
    saveCourse() {
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
          errorMessage = '价格范围为0-999，请删减后再试';
        }
        this.$message({
          message: errorMessage,
          type: 'error',
          duration: 3000
        });
      });
    },
    editCourse(index) {
      this.formCourse = { ...this.courses[index] };
      this.editingCourse = index;
    },
    deleteCourse(index) {
      this.courses.splice(index, 1);
      if (this.editingCourse === index) {
        this.formCourse = { title: '', description: '' };
        this.editingCourse = null;
      }
    }
  }
}
</script>

<!-- CSS 样式见上一回 -->

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
</style>