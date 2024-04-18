<template>
  <el-row :gutter="20">
    <CourseCard :searchResults="searchResults"/>
  </el-row>
</template>

<script>
import CourseCard from './CourseCard.vue';
import axios from 'axios';

export default {
  name: 'CourseListComponent',
  components: {
    CourseCard
  },
  data() {
    return {
      searchResults: []
    }
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses') // 确保使用正确的HTTP端点
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error(error);
          // 添加错误处理
        })
    }
  }
}
</script>

<style scoped>

</style>