<template>
  <div class="center-container">
    <!-- 新闻表格 -->
    <el-table :data="formattedNewsList" style="width: 100%" empty-text="暂无新闻">
      <el-table-column prop="title" label="新闻标题"></el-table-column>
      <el-table-column prop="content" label="新闻内容"></el-table-column>
      <el-table-column
        prop="publish_date"
        label="发布时间"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button type="primary" @click="handleEditNews(scope.row)">修改</el-button> -->
          <el-button type="danger" @click="handleDeleteNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 添加新闻按钮 -->
     <el-button type="primary" @click="showAddNewsForm" style="margin-top: 20px;">添加新闻</el-button>

      <!-- 添加新闻的模态框 -->
    <el-dialog title="添加新闻" v-model="dialogAddVisible" width="50%">
      <!-- 将原有的添加新闻表单内容整合进这里，使用el-plus组件 -->
      <!-- 表单内容略 -->
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
            <el-button type="primary" @click="submitForm('form')">提交/修改</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

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
      formattedNewsList: [], // 存储格式化后的新闻列表
      dialogAddVisible:false,
      previewNews: null,
    };
  },
  created() {
    this.fetchNews(); // 模拟获取新闻数据
  },
  methods: {
    fetchNews() {
      axios.get('http://localhost:3000/api/news_images')
        .then(response => {
          // 判断API返回的数据是否为数组
          if(!response.data || !Array.isArray(response.data)) {
            console.error("Invalid API response");
            return;
          }
          this.formattedNewsList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    handleDeleteNews(news) {
      const newsId = news.newid; // 假设每条新闻都有一个id属性
      console.log(newsId);
      // 使用Element Plus的MessageBox来确认是否删除新闻
      ElMessageBox.confirm(`确定要删除标题为 "${news.title}" 的新闻吗？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        axios.delete(`http://localhost:3000/api/news_images/${newsId}`)
        .then(response => {
          console.log(response);
          // 如果后端返回成功状态，更新前端的newsList
          this.formattedNewsList = this.formattedNewsList.filter(item => item.newid !== newsId);
          this.fetchNews();
          this.$message({
            type: 'success',
            message: '新闻已删除',
          });
        })
        .catch(error => {
          console.error("删除新闻时出现错误：", error);
          this.$message.error('新闻删除失败');
        });
      }).catch(() => {
        console.log('新闻删除操作已取消');
      });
    },

    showAddNewsForm() {
      this.dialogAddVisible = true; // 显示添加新闻的表单
    },

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
              this.dialogVisible = true;
              this.fetchNews();
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
      this.form = {
        fileList: [],
        newid: '',
        title: '',
        content: '',
        date: null,
        image: ''
      };
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.previewNews = null;
    },
    formatDate(row, column, cellValue) {
      if (!cellValue) {
        return '';
      }
      const date = new Date(cellValue);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
};
</script>

<style scoped>
.center-container {
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.create-news {
  display: flex;         /* 启用 Flex 布局 */
  justify-content: center;/* 水平居中 */
}
.styled-form {
  margin: 0 auto;
  max-width: 500px;
}
.preview-image {
  max-width: 100%;
}
</style>