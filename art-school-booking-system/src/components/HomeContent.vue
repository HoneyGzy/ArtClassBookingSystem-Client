<template>
    <div class="home-container">
      <!-- 欢迎区域 -->
      <section class="welcome-section">
        <div class="content">
            <h1 class="title">艺术学校约课管理系统</h1>
            <p class="description">
            欢迎来到艺术学校约课管理系统，这里提供了一个全面的平台，让您可以轻松地管理您的课程预约和日程安排。我们的系统特别为艺术学校的师生打造，不仅支持课程浏览、预约，还提供个性化的课程推荐和管理功能。
            </p>
            <p class="description">
            利用我们直观的界面，您可以快速查看所有可用课程，比较不同课程的特点，并选择最适合您的时间进行约课。老师们也可以使用我们的平台来设置他们的教学时间表，管理学生预约，以及跟踪课程完成情况。
            </p>
            <p class="description">
            我们致力于确保您的预约体验既便捷又高效，随时通过我们的在线帮助和支持获取帮助。加入我们，开启您的艺术学习之旅，让每一节课都计划得井井有条。
            </p>
        </div>
      </section>
  
      <!-- 最新通知 -->
      <section class="announcement-section">
        <div class="content">
          <h2 class="section-title">最新通知</h2>
          <ul class="announcement-list">
            <li class="announcement-item">
              校历更新 - 查看最新假期和学期时间表
            </li>
            <li class="announcement-item">
              教师培训 - 下周三在图书馆举行
            </li>
            <!-- 更多通知 -->
          </ul>
        </div>
      </section>
  
      <!-- 快捷入口 -->
      <section class="quick-access-section">
        <div class="content">
          <h2 class="section-title">快捷入口</h2>
          <nav class="quick-access-nav">
            <router-link class="access-link" to="/courses">浏览课程</router-link>
            <router-link class="access-link" to="/schedule">我的时间表</router-link>
            <router-link class="access-link" to="/account">个人帐户</router-link>
            <!-- 其他入口 -->
          </nav>
        </div>
      </section>
  
      <!-- 帮助与支持 -->
      <section class="help-section">
        <div class="content">
          <h2 class="section-title">帮助与支持</h2>
          <p>遇到问题？查看我们的 <router-link to="/help">帮助中心</router-link>。</p>
        </div>
      </section>
    </div>
  </template>


  <script>
  export default {
    name: 'HomeContent',
    // 你可以在这里添加数据、计算属性或方法
    data() {
      return {
        // 首页数据
      };
    },
    // 计算属性
    computed: {
      // ...
    },
    // 方法
    methods: {
      // ...
    },
    // 组件的生命周期钩子，比如已挂载（mounted）等
    mounted() {
      // ...
    }
  };
  </script>
  
  <style scoped>
.home-container {
  max-width: 1200px;
  margin: auto;
}

.section {
  margin-bottom: 2rem;
}

.content {
  padding: 2rem;
}

.title, .section-title {
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 0.5rem;
  line-height: 1.6; /* Improve readability */
}

/* Adjustments for different screen sizes */
@media screen and (max-width: 992px) {
  .description {
    font-size: 0.9rem; /* Adjust font size for readability on smaller screens */
  }
}

.announcement-section, .quick-access-section, .help-section {
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.announcement-list {
  list-style: none;
  padding: 0;
}

.announcement-item {
  background: #fff;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #ddd;
}

.quick-access-nav {
  display: flex;
  justify-content: space-around; /* Or use Flexbox for alignment */
}

.access-link {
  background-color: #007bff;
  color: white;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.access-link:hover {
  background-color: #0056b3;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .quick-access-nav {
    flex-direction: column;
  }
  
  .access-link {
    margin-bottom: 1rem;
  }
}
</style>