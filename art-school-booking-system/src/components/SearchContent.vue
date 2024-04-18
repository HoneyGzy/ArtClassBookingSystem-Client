<template>
  <div class="search-component">
    <el-container direction="vertical">
      <el-header height="auto">
        <!--搜索输入和建议-->
        <el-autocomplete
          class="input-item"
          v-model="searchQuery"
          :fetch-suggestions="suggest"
          placeholder="搜索课程或教师..."
          @select="handleSelect"
        ></el-autocomplete>

        <!--分类筛选-->
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

        <!--搜索按钮-->
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-header>

      <!--搜索结果-->
      <el-main>
        <div v-if="searchResults.length > 0">
          <h2>搜索结果</h2>
          <el-card
            class="box-card"
            v-for="result in searchResults"
            :key="result.id"
            style="margin-bottom: 20px"
          >
            <h3>{{ result.title }}</h3>
            <p>{{ result.description }}</p>
            <p>教师: {{ result.teacher }}</p>
            <p>课程时长: {{ result.duration }}分钟</p>
            <p>课程日期: {{ result.date }}</p>
            <p>价格: {{ result.price }}</p>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'SearchComponent',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedSort: '',
      suggestions: [],
      searchResults: [],
      categories: ['技术', '艺术', '语言', '科学'], // 示例分类
      sorts: [
        { text: '按相关性排序', value: 'relevance' },
        { text: '按最新排序', value: 'newest' },
        { text: '按评分排序', value: 'rating' },
      ],
    };
  },
  methods: {
    suggest() {
      // 这里应该是访问后端接口的 API 调用
      // 根据用户输入查询建议
      // 示例中我们只用了本地过滤
      this.suggestions = this.searchQuery
        ? this.categories.filter((c) =>
            c.toLowerCase().includes(this.searchQuery.toLowerCase()),
          )
        : [];
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
        // 处理成功响应
        this.searchResults = response.data;
      })
      .catch(error => {
        // 处理错误响应
        console.error('There was an error!', error);
      });
    },
  },
};
</script>

<style scoped>
.search-component {
  justify-content: center;
  padding: 20px;
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
  padding: 10px 0;
}

.box-card {
  margin-bottom: 20px;
}
</style>