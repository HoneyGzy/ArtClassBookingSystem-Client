<template>
  <div class="search-component">
    <el-container direction="vertical">
      <el-header height="auto">
        <!-- 搜索输入和建议 -->
        <el-autocomplete
          class="input-item"
          v-model="searchQuery"
          :fetch-suggestions="suggest"
          placeholder="搜索课程或教师..."
          @select="handleSelect"
        ></el-autocomplete>

        <!-- 分类筛选 -->
        <el-select class="select-item" v-model="selectedCategory" placeholder="所有分类">
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>

        <!-- 排序选项 -->
        <el-select class="select-item" v-model="selectedSort" placeholder="默认排序">
          <el-option
            v-for="sort in sorts"
            :key="sort.value"
            :label="sort.text"
            :value="sort.value"
          ></el-option>
        </el-select>

        <!-- 搜索按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-header>

      <!-- 搜索结果 -->
      <el-main>
        <el-row :gutter="20">
          <!-- 传递搜索结果到 CourseCard 组件 -->
          <CourseCard 
            v-for="course in pagedResults" 
            :key="course.id"
            :searchResults="[course]"
          >
            <template #extra>
              <el-button type="primary" @click="openReserveDialog(course)">预约课程</el-button>
            </template>
          </CourseCard>
        </el-row>
        <el-pagination
            layout="total, sizes, prev, pager, next"
            :total="searchResults.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import CourseCard from './CourseCard.vue';

export default {
  name: 'SearchComponent',
  components: {
    CourseCard,
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedSort: '',
      suggestions: [],
      searchResults: [],
      categories: ['音乐分类', '舞蹈分类', '绘画分类', '书法分类', '设计分类', '雕塑分类', '摄影分类', '乐器分类'], // 示例分类
      sorts: [
        { text: '按相关性排序', value: 'relevance' },
        { text: '按最新排序', value: 'newest' },
        { text: '按评分排序', value: 'rating' },
      ],
      pagedResults: [],
      pageSize: 4,
      currentPage: 1,
    };
  },
  methods: {
    suggest(queryString, callback) {
      // 模拟后台返回建议
      callback(this.categories.filter(c => c.toLowerCase().includes(queryString.toLowerCase())));
    },
    search() {
      axios.get('http://localhost:3000/api/search', {
        params: {
          query: this.searchQuery,
          category: this.selectedCategory,
          sort: this.selectedSort
        }
      })
      .then(response => {
        this.searchResults = response.data;
        this.handlePagination(); // 搜索完成后立即进行分页处理
      })
      .catch(error => {
        console.error('There was an error!', error);
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
    },
    openReserveDialog(course) {
      console.log("预订课程: ", course);
      // 您的逻辑
    }
  },
};
</script>

<style scoped>
.search-component {
  justify-content: center;
  padding: 20px;
  height: 50vh;
}

.search-component .el-header {
  align-items: center;
  justify-content: space-between;
}

.input-item,
.select-item {
  margin-right: 20px;
  width: 200px;
}

.el-main {
  margin-top: 50px;
  padding: 10px 0;
  height :100vh;
}

.box-card {
  margin-bottom: 20px;
}

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

.el-card {
  display: flex;
  flex-direction: column; /* 使用flex布局，和下面的 margin-bottom 配合使用，确保内容撑开 */
  min-height: 300px; /* 为卡片设置统一最小高度，您可以根据实际需求调整此值 */
  margin-bottom: 1em; /* 为卡片底部提供一些间隔 */
}

.el-card .meta {
  margin-top: auto; /* 使用自动外边距将meta部分推到底部 */
}
</style>