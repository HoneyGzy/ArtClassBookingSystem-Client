<template>
  <el-container class="dashboard-container">
    <el-header
      v-bind:class="{'header-red': userRole === 'teacher', 'header-blue': userRole !== 'teacher'}"
      class="dashboard-header"
    >
      <h1 class="dashboard-title">艺术学校约课管理系统</h1>
      <div class="user-info">
        <span class="username">欢迎您：{{ username }}</span>
        <el-button type="primary" class="logout-button" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container style="height: 100vh;">
      <el-aside width="200px" class="menu-aside">
        <el-menu
          class="custom-menu"
          background-color="#333" 
          text-color="#fff" 
          active-text-color="#409EFF"
          default-active="1" 
          style="height: 100vh;padding: 18px"
        >
        <el-menu-item index="3" @click="handleNavSelection('3')">
          <el-icon><search /></el-icon>
          <span>课程列表</span>
        </el-menu-item>

        <el-menu-item index="5" @click="handleNavSelection('5')">
          <el-icon><search /></el-icon>
          <span>课程搜索</span>
        </el-menu-item>

        <el-menu-item index="6" @click="handleNavSelection('6')">
          <el-icon><calendar /></el-icon>
          <span>预约管理</span>
        </el-menu-item>

        <el-menu-item index="9"  @click="handleNavSelection('9')">
          <el-icon><user /></el-icon>
          <span>用户中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="content-display">
        <!-- 你的内容组件将在这里渲染 -->
        <component :is="selectedCategoryComponent"></component>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>

import { ElContainer, ElHeader, ElAside, ElMenu, ElMenuItem, ElMenuItemGroup, ElButton, ElMain } from 'element-plus';
import CreateCourseContent from './CreateCourseContent.vue';
import HomeContent from './HomeContent.vue';
import HotRecommend from './HotRecommend.vue';
import SearchComponent from './SearchContent.vue'
import CourseBookingCotent from'./CourseBookingCotent.vue'
import UserManagerComponent from './UserManagerContent.vue'
import EvaluationManagementComponent from './EvaluationManagement.vue'
import UserCenterComponent from './UserCenter.vue'
import CourseRegistration from './CourseRegistration.vue'
import CourseListComponent from './CourseListContent.vue'
import CourseManagerComponent from './CourseManagerContent.vue'
import BookingCotentManageComponent from './BookingCotentManageComponent.vue'
// import { Search, Calendar, ShoppingCart, Comment, User } from '@element-plus/icons-vue';

export default {
  name: 'DashboardComponent',
  components: {
    CreateCourseContent,
    HomeContent,
    HotRecommend,
    SearchComponent,
    CourseBookingCotent,
    UserManagerComponent,
    EvaluationManagementComponent,
    UserCenterComponent,
    CourseRegistration,
    CourseListComponent,
    CourseManagerComponent,
    BookingCotentManageComponent,

    ElContainer,
    ElHeader,
    ElAside,
    ElMenu,
    ElMenuItem,
    
    ElMenuItemGroup,
    ElButton,
    ElMain,
  },
  data() {
    return {
      selectedCategory: '',
      categoryContent: '', 
      selectedCategoryComponent: null, // 当前选中的组件
      userRole: null,
      username: null,
    };
  },

  beforeRouteLeave(to, from, next) {
  console.log(from.name)
  const userRole = localStorage.getItem('userRole');

  // 判断来源页路由以及用户的角色
  if ((from.name === 'Login' || (from.name === 'AdminDashboard' && userRole === 'admin'))) {
    // 如果从登录页面或者管理员页面跳转而来，那么不允许回退
    next(false);
  } else {
    // 允许正常跳转
    next();
  }
},

  created() {
    this.setUserRole();
    this.setUserName();
    this.handleNavSelection('3');
  },

  methods: {
    logout() {
      // 清除localStorage中的用户数据
      localStorage.removeItem('userRole');
      localStorage.removeItem('userToken');
      // 使用Vue Router重定向到登录页面
      this.$router.push({ name: 'Login' });
    },
    handleNavSelection(index){
      switch(index){
        case '1':
          this.selectedCategoryComponent = 'HomeContent';
          break;
        case '2':
          this.selectedCategoryComponent = "UserManagerComponent";
          break;
        case '3':
          this.selectedCategoryComponent = "CourseListComponent";
          // 逻辑处理“编辑”功能
          break;
        case '4':
          this.selectedCategoryComponent = 'HotRecommend';
          break;
        case '5':
          this.selectedCategoryComponent = 'searchComponent';
          break;
        case '6':
          if (this.userRole === 'teacher') {
            this.selectedCategoryComponent = 'BookingCotentManageComponent';
            break;
          } else {
            this.selectedCategoryComponent = 'CourseBookingCotent';
            break;    
          }
        case '7':
          this.selectedCategoryComponent = 'CourseRegistration';
          break;    
        case '8':
          this.selectedCategoryComponent = 'EvaluationManagementComponent';
          break;    
        case '9':
          this.selectedCategoryComponent = 'UserCenterComponent';
          break;        

        // 其他菜单项对应的代码...
      }
    },
  // ...其他方法...
  setUserRole() {
    // 从 localStorage 获取用户角色
    this.userRole = localStorage.getItem('userRole');
    console.log('Current user role:', this.userRole);
  },
  setUserName()
  {
    // 从 localStorage 获取用户角色
    this.username = localStorage.getItem('userName');
    console.log('Current user name:', this.username);
  }
  
},
  mounted() {
    console.log('仪表板已经加载');
  }
};



</script>

<style scoped>

 .nav-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

.course-category li {
  padding: 10px; /* 设置列表项的内边距，或根据需要进行调整 */
  /* 添加边框和背景颜色等样式以匹配您的设计 */
  border-radius: 5px; /* 圆角 */
  transition: background-color 0.3s; /* 平滑的背景变化效果 */
  cursor: pointer; /* 表明这些列表项是可点击的 */
}

.course-category li:hover {
  background-color: #e0e0e0; /* 鼠标悬停时的背景颜色为灰色 */
}


.dashboard-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0.2em;
  background: #F5F5F5;
  border: 1px solid #d3d3d3;
  border-radius: 0;
  box-sizing: border-box;
}

.dashboard-header {
  display: flex;
  justify-content: space-between; /* 平均分配主轴空间 */
  align-items: center;
  padding: 2em;
  color: #fff;
  height: 108px;
}

.header-red {
  background-color: red;
}

.header-blue {
  background-color: rgb(122, 3, 158);
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-right: 20px; /* 与退出按钮之间的距离 */
}


.logout-button:hover {
  background-color: #004d40;
}

.dashboard-title {
  color: #fff;
  font-size: 2em;
}

.dashboard-body {
  background-color: #fff; /* Dashboard body 颜色，与 header 区分 */
  padding: 0.2em;
  display: flex;
  flex-direction: row; /* 确保内容是水平排列的 */
  height: calc(100% - 60px); /* 减去header的高度，如果header高度不是60px，请调整这个值 */
  box-sizing: border-box; /* 计算边框和内边距在内的高度 */
}

.search-function {
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  width: 400px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
}

button[type="submit"] {
  padding: 10px;
  color: #fff;
  background: #00695c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #004d40;
}

.dashboard-body {
  display: flex;
  /* 根据需要可以设置间距 */
}

.dashboard-nav {
  flex: 0 0 200px; /* 根据需要设置导航宽度，这里设置为固定200px */
  background-color: #333; /* 导航背景颜色，例如深灰色 */
  color: #fff; /* 文本颜色 */
  /* 更多样式根据需要添加，比如内边距、导航项样式等 */
}

.dashboard-nav ul {
  list-style: none; /* 移除列表默认的项目符号 */
  padding: 0; /* 移除默认的padding */
}

.dashboard-nav li {
  padding: 10px; /* 设置导航项内边距 */
  /* 如果需要，可以为鼠标悬停时增加样式 */
}

.dashboard-nav li:hover {
  background-color: #555; /* 鼠标悬停时的背景颜色 */
}

.content-display {
  flex: 1; /* 让内容展示块填充剩余空间 */
  background-color: #f5f5f5; /* 内容展示区域的背景颜色 */
  padding: 20px; /* 内容展示区域的内边距 */
  /* 更多样式根据需要添加，例如文本样式、间距等 */
}

.course-category li {
  padding: 10px; /* 设置列表项的内边距，或根据需要进行调整 */
  /* 添加边框和背景颜色等样式以匹配您的设计 */
  border-radius: 5px; /* 圆角 */
  transition: background-color 0.3s; /* 平滑的背景变化效果 */
  cursor: pointer; /* 表明这些列表项是可点击的 */
}

.course-category li:hover {
  background-color: #e0e0e0; /* 鼠标悬停时的背景颜色为灰色 */
}

.user-info {
  display: flex;
  align-items: center;
}

.logout-button {
  padding: 5px 15px;
  color: #fff;
  background-color: #070420; /* 按钮背景颜色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.logout-button:hover {
  background-color: #004d40;
}

.dashboard-body {
  background-color: #fff; /* Dashboard body 颜色，与 header 区分 */
  padding: 0.2em;
  display: flex;
  flex-direction: row; /* 确保内容是水平排列的 */
  height: calc(100% - 60px); /* 减去header的高度，如果header高度不是60px，请调整这个值 */
  box-sizing: border-box; /* 计算边框和内边距在内的高度 */
}

.search-function {
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  width: 400px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
}

button[type="submit"] {
  padding: 10px;
  color: #fff;
  background: #00695c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #004d40;
}

.dashboard-body {
  display: flex;
  /* 根据需要可以设置间距 */
}

.dashboard-nav {
  flex: 0 0 200px; /* 根据需要设置导航宽度，这里设置为固定200px */
  background-color: #333; /* 导航背景颜色，例如深灰色 */
  color: #fff; /* 文本颜色 */
  /* 更多样式根据需要添加，比如内边距、导航项样式等 */
}

.dashboard-nav ul {
  list-style: none; /* 移除列表默认的项目符号 */
  padding: 0; /* 移除默认的padding */
}

.dashboard-nav li {
  padding: 10px; /* 设置导航项内边距 */
  /* 如果需要，可以为鼠标悬停时增加样式 */
}

.dashboard-nav li:hover {
  background-color: #555; /* 鼠标悬停时的背景颜色 */
}

.content-display {
  flex: 1; /* 让内容展示块填充剩余空间 */
  background-color: #f5f5f5; /* 内容展示区域的背景颜色 */
  padding: 20px; /* 内容展示区域的内边距 */
  /* 更多样式根据需要添加，例如文本样式、间距等 */
}

.nav-button {
  padding: 15%; /* 增加按钮内边距，使间距变大 */
  width: 100%;
  text-align: center; /* 将文字居中显示 */
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
  display: block; /* 设置按钮为块级元素 */
  font-size: 1.3em; /* 放大按钮文字 */
  margin-bottom: 10px; /* 增加按钮之间的间距 */
}
.nav-button:hover {
  background-color: #e0e0e0;
}

.custom-menu .el-menu-item {
  /* 增加每个菜单项的间距 */
  margin-top: 18px;
  margin-bottom: 20px; /* 可以根据您的需求调整这个值 */
}

.custom-menu .custom-sub-menu{
  margin-top: 18px;
  margin-bottom: 20px
}

.custom-menu .el-menu-item span {
  /* 改变菜单项内文字的大小 */
  font-size: 18px; /* 可以根据您的需求调整这个值 */
}

.custom-menu .custom-sub-menu span
{
  font-size: 18px;
}
.custom-sub-menu-title .el-menu-item{
  font-size: 18px;
}
</style>