<template>
  <el-card shadow="hover" style="margin-bottom: 20px; width: 100%; height: 100%">
    <div>
      <div class="content-field">
        <el-tag size="small" effect="plain">课程名称</el-tag>
        <h2 class="el-typography">{{ course.title }}</h2>
      </div>

      <el-divider></el-divider>

      <div class="content-field">
        <span class="content-label content-tag"><el-tag size="small" effect="plain">描述</el-tag></span>
        <div class="content-description">{{ course.description }}</div>
      </div>

      <el-divider></el-divider>

      <div class="meta">
        <div class="column">
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
            <el-tag type="info">{{ formattedDate(course.date) }}</el-tag>
          </div>
          <div class="content-field">
            <el-tag size="small" effect="plain">价格</el-tag>
            <el-tag type="warning">¥{{ course.price }}</el-tag>
          </div>
        </div>
        <div class="column">
          <div class="content-field">
            <el-tag size="small" effect="plain">分类</el-tag>
            <el-tag>{{ course.category }}</el-tag>
          </div>
          <div class="content-field">
            <el-tag size="small" effect="plain">难度</el-tag>
            <el-tag>{{ course.difficulty }}</el-tag>
          </div>
          <div class="content-field">
            <el-tag size="small" effect="plain">推荐年龄</el-tag>
            <el-tag>{{ course.recommended_age }}岁</el-tag>
          </div>
          <div class="content-field">
            <el-tag size="small" effect="plain">课程编号</el-tag>
            <el-tag>{{ course.course_id }}</el-tag>
          </div>
        </div>
      </div>
      <slot name="extra"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  created() {
    console.log(this.course);
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