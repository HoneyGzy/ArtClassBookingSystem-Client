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
          <slot name="extra"></slot>
        </div>
      </el-card>
    </el-col>
  </template>


<!-- <template>
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <el-card shadow="hover" style="margin-bottom: 20px">
        <div>
          <div class="content-field">
            <el-tag size="small" effect="plain">课程名称</el-tag>
            <h2 class="el-typography">{{ course.title }}</h2>
          </div>
  
          <el-divider></el-divider>
  
          <div class="content-field">
            <span class="content-label content-tag"><el-tag size="small" effect="plain">描述</el-tag></span>s
            <div class="content-description">{{ course.description }}</div>
          </div>
  
          <el-divider></el-divider>
  
          <div class="meta">
            <div class="content-field">
              <el-tag size="small" effect="plain">教师</el-tag>
              <el-tag>{{ course.teacher }}</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">时长</el-tag>
              <el-tag type="success">{{ course.duration }} 分钟</el-tag>
            </div>
            <div class="content-field">
              <el-tag size="small" effect="plain">日期</el-tag>
              <el-tag type="info">{{ new Date(course.date).toLocaleDateString() }}</el-tag>
            </div>
            <div class="content-field">
                <el-tag size="small" effect="plain">价格</el-tag>
                <el-tag type="warning">¥{{ course.price }}</el-tag>
            </div>
          </div>
          <slot name="extra"></slot>
        </div>
      </el-card>
    </el-col>
  </template> -->
  
<script>
export default {
props: {
    searchResults: {
    type: Array,
    required: true
    }
    // course: {
    //   type: Object,
    //   required: true
    // }
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
  flex-direction: column; /* 使用flex布局，和下面的 margin-bottom 配合使用，确保内容撑开 */
  min-height: 300px; /* 为卡片设置统一最小高度，您可以根据实际需求调整此值 */
  margin-bottom: 1em; /* 为卡片底部提供一些间隔 */
}

.el-card .meta {
  margin-top: auto; /* 使用自动外边距将meta部分推到底部 */
}
  
</style>