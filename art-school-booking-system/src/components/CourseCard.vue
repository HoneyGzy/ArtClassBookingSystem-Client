<template>
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
          <div class="column">
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
              <el-tag type="info">{{ formattedDate(result.date) }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">价格</el-tag>
              <el-tag type="warning">¥{{ result.price }}</el-tag>
            </div>
          </div>
          <div class="column">
            <div class="content-field">
              <el-tag size="small" effect="plain">分类</el-tag>
              <el-tag>{{ result.category }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">难度</el-tag>
              <el-tag>{{ result.difficulty }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">推荐年龄</el-tag>
              <el-tag>{{ result.recommended_age }}岁</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">课程编号</el-tag>
              <el-tag>{{ result.course_id }}</el-tag>
            </div>
          </div>
        </div>
        <slot name="extra"></slot>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  props: {
    searchResults: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  created() {
    console.log(this.searchResults);
  },
  methods: {
    formattedDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
}
</script>

<style scoped>
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
    flex-direction: column;
    min-height: 300px;
    margin-bottom: 1em;
  }

  .el-card .meta {
    margin-top: auto;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
  }

  .column {
    flex: 1;
  }
</style>