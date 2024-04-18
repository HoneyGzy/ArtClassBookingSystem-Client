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
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="result in searchResults" :key="result.id">
            <el-card shadow="hover" style="margin-bottom: 20px">
              <div>
                <div class="content-field">
                  <el-tag size="small" effect="plain">课程名称</el-tag>
                  <h2 class="el-typography">{{ result.title }}</h2>
                </div>

                <el-divider></el-divider>

                <div class="content-field">
                  <span class="content-label content-tag"><el-tag size="small" effect="plain">描述</el-tag></span>
                  <div class="content-description">{{ result.description }}</div>
                </div>

                <el-divider></el-divider>

                <div class="meta">
                  <div class="content-field">
                    <el-tag size="small" effect="plain">教师</el-tag>
                    <el-tag>{{ result.teacher }}</el-tag>
                  </div>
                  <div class="content-field">
                    <el-tag size="small" effect="plain">时长</el-tag>
                    <el-tag type="success">{{ result.duration }} 分钟</el-tag>
                  </div>
                  <div class="content-field">
                    <el-tag size="small" effect="plain">日期</el-tag>
                    <el-tag type="info">{{ new Date(result.date).toLocaleDateString() }}</el-tag>
                  </div>
                  <div class="content-field">
                    <el-tag size="small" effect="plain">价格</el-tag>
                    <el-tag type="warning">¥{{ result.price }}</el-tag>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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