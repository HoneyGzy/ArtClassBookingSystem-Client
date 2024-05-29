<template>
  <div class="center-container">
    <div class="create-news">
      <el-form :model="form" ref="form" label-width="100px" class="styled-form">
        <el-form-item label="新闻ID">
          <el-input v-model="form.newid" placeholder="请输入新闻ID"></el-input>
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
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :http-request="handleCustomRequest"
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
          <p><strong>ID：</strong>{{ previewNews.newid }}</p>
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
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        fileList: [],
        newid: '', // 新增新闻ID字段
        title: '',
        content: '',
        date: null,
        image: ''
      },
      dialogVisible: false,
      previewNews: null,
    };
  },
  methods: {

    handleCustomRequest({ file }) {
      this.form.file = file;
    },
    handleUploadSuccess(response, file, fileList) {
      // 处理上传成功逻辑
      this.form.fileList = fileList;
      if (response && response.file) {
        this.form.image = `http://localhost:3000/uploads/${response.file.filename}`;
      }
    },
    handleRemove(file, fileList) {
      // 处理文件删除逻辑
      this.form.fileList = fileList;
    },
    beforeRemove(file) {
      return this.$confirm(`确定要删除 ${file.name}？`);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('file', this.form.file); // 添加文件
          formData.append('newid', this.form.newid);
          formData.append('title', this.form.title);
          formData.append('content', this.form.content);

          const formattedDate = new Date(this.form.date).toISOString().split('T')[0];
          formData.append('publish_date', formattedDate);

          // 现在发送所有数据，包括文件
          axios.post('http://localhost:3000/api/news_images', formData)
            .then(response => {
              this.handleUploadSuccess(response.data);
              this.previewNews = { ...this.form, image: response.data.file.path }; // 根据实际返回数据调整
              this.dialogVisible = true;
              this.$message.success('提交成功');
            })
            .catch(error => {
              console.error('Error:', error);
              this.$message.error('上传失败');
            });
        } else {
          console.log('表单校验失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.fileList = [];  // 清空文件列表
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.previewNews = null;
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
.create-news {
  width: 60%;
}
.styled-form {
  margin: 0 auto;
  max-width: 500px;
}
.preview-image {
  max-width: 100%;
}
</style>