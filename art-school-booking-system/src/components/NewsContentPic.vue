<template>
  <div class="center-container">
    <div class="create-news">
      <el-form :model="form" ref="form" label-width="100px" class="styled-form">
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="form.fileList"
            list-type="picture"
            :limit="1"
            accept="image/*"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template v-slot:tip>
              <div class="el-upload__tip">只能上传一张图片</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻标题">
          <el-input v-model="form.title" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容">
          <el-input
            type="textarea"
            v-model="form.content"
            placeholder="请输入新闻内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        title="新闻预览"
        v-model:visible="dialogVisible"
        width="50%"
        :before-close="handleDialogClose"
      >
        <div v-if="previewNews">
          <img :src="previewNews.image" class="preview-image" alt="News Image" />
          <p><strong>标题：</strong>{{ previewNews.title }}</p>
          <p><strong>内容：</strong>{{ previewNews.content }}</p>
          <p><strong>日期：</strong>{{ previewNews.date }}</p>
        </div>
        <template v-slot:footer>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        image: '',
        fileList: [],
        title: '',
        content: '',
        date: ''
      },
      dialogVisible: false,
      previewNews: null,
    };
  },
  methods: {
    handleUploadSuccess(response, file) {
      this.form.image = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      this.form.image = '';
      this.form.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.previewNews = { ...this.form };
          this.dialogVisible = true;
        } else {
          this.$message.error('请填写完整的新闻信息');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.fileList = [];
    },
    handleDialogClose() {
      this.form.fileList = [];
      this.resetForm('form');
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.styled-form {
  width: 600px; /* 你可以根据需要调整这个宽度值 */
}
/* .create-news {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
} */
.upload-demo {
  width: 200px;
}
.preview-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}
</style>