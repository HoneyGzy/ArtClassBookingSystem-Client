<template>
    <div class="course-list">
      <div v-for="(course, index) in courses" :key="course.id" class="course-item">
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
        <p>{{ course.teacher }}</p>
        <p>{{ course.duration }}</p>
        <p>{{ new Date(course.date).toLocaleString() }}</p>
        <p>{{ course.price }}</p>
        <button @click="editCourse(index)">编辑课程</button>
        <button @click="deleteCourse(index)">删除课程</button>
      </div>

      <!-- Modal window for course editing -->
      <div class="modal" v-if="showModal">
        <h2>编辑课程</h2>
        <form @submit.prevent="updateCourse">
          <label>课程名称: 
            <input type="text" v-model="selectedCourse.title">
          </label>
          <label>课程描述: 
            <input type="text" v-model="selectedCourse.description">
          </label>
          <label>课程老师: 
            <input type="text" v-model="selectedCourse.teacher">
          </label>
          <label>课程日期: 
            <input type="datetime-local" v-model="selectedCourse.date">
          </label>
          <label>课程价格: 
            <input type="text" v-model="selectedCourse.price">
          </label>
          <!-- Add form fields for other course properties... -->
          <button type="submit">保存</button>
        </form>
        <button @click="closeModal">关闭窗口</button>
      </div> 
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'CourseManagerComponent',
  data() {
    return {
      courses: [],
      showModal: false,
      selectedCourse: null
    }
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses')
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.error(error);
        })
    },
    editCourse(index) {
      this.showModal = true;
      this.selectedCourse = Object.assign({}, this.courses[index]);  // 避免直接修改课程列表数据
    },
    closeModal() {
      this.showModal = false;
    },
    updateCourse() {
      axios.put(`http://localhost:3000/api/courses/${this.selectedCourse.id}`, this.selectedCourse)
        .then(response => {
          console.log(response)  
          let index = this.courses.findIndex(course => course.id === this.selectedCourse.id);
          if (index !== -1) {
            this.courses.splice(index, 1, this.selectedCourse);
          }
          this.closeModal();
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteCourse(index) {
      console.log(index)  
      axios.delete(`http://localhost:3000/api/courses/${this.courses[index].id}`)
        .then(response => {
          console.log(response)  
          this.courses.splice(index, 1);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>
.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
}
.course-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
/* .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 500px;
  padding: 20px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
} */




.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 800px;
  padding: 40px;
  border-radius: 10px;
  background: white;
  transition: all 0.3s ease-out;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 18px;
}

.modal h2 {
  font-size: 32px;
}

.modal form {
  margin-top: 20px;
}

.modal label {
  display: block;
  margin-bottom: 10px;
}

.modal input {
  height: 40px;
  width: 100%;
  padding: 0 10px;
  font-size: 18px;
}

.modal button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
}

.modal button:hover {
  background: #0056b3;
}

.modal button:disabled {
  background: #ccc;
  cursor: default;
}


</style>