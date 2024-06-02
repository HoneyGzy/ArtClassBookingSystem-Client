<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <h2>我的课程</h2>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <CourseCard :searchResults="pagedResults"/>
  </el-row>
  <transition name="fade">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="searchResults.length">
    </el-pagination>
  </transition>
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
      searchResults: [],
      pagedResults: [],
      pageSize: 12,
      currentPage: 1,
      useusername: null, // 添加这一行
    }
  },
  created() {
    this.useusername = localStorage.getItem('userName'); // 获取当前用户的用户名
    console.log(this.useusername)
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios.get('http://localhost:3000/api/courses/teacher', {
        params: {
          username: this.useusername, // 传递当前用户的用户名作为参数
        },
      }) 
        .then(response => {
          this.searchResults = response.data; // 保存查询结果
          this.handlePagination(); // 处理分页
        })
        .catch(error => {
          console.error(error);
          // 添加错误处理
        });
    },
    handlePagination() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedResults = this.searchResults.slice(start, end);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlePagination();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlePagination();
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin: 20px 0;
  text-align: center;
}

/* 修改页码数字的颜色 */
.el-pagination .el-pager li:not(.disabled):not(.active) {
  color: #409eff;
}

/* 修改当前激活页码的背景和文字颜色 */
.el-pagination .el-pager li.active {
  background-color: #409eff;
  color: #fff;
}

/* 修改每页显示数量选择器的颜色 */
.el-pagination .el-pagination__sizes .el-input .el-input__inner {
  color: #409eff;
}

/* 修改跳转页输入框的颜色 */
.el-pagination .el-pagination__jump .el-input .el-input__inner {
  color: #409eff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

</style>