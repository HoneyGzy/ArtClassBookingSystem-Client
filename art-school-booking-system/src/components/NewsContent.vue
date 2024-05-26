<template>
  <div class="news-management">
    <el-table :data="newsList" style="width: 100%" empty-text="暂无资讯">
      <el-table-column prop="title" label="资讯标题"></el-table-column>
      <el-table-column prop="content" label="资讯内容"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEditNews(scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDeleteNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑资讯" v-model="dialogVisible">
      <!-- 这里插入您之前提供的添加/编辑资讯的表单模板 -->
      <div id="latest-news">
        <el-form class="news-form" ref="formNews" :model="formNews" label-position="top">
          <h3>最新资讯</h3>
          
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="资讯标题" prop="title">
                <el-input v-model="formNews.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="资讯内容" prop="content">
            <el-input type="textarea" v-model="formNews.content"></el-input>
          </el-form-item>
    
          <el-form-item label="发布时间" prop="date">
            <el-input type="datetime-local" v-model="formNews.date"></el-input>
          </el-form-item>
    
          <el-button
            type="primary"
            @click="isEditMode ? submitNewsEdit() : addNews"
          >
            {{ isEditMode ? '修改资讯' : '发布资讯' }}
          </el-button>
        </el-form>
      </div>
    </el-dialog>

    <el-button type="primary" @click="handleAddNews">添加咨询</el-button>
  </div>

  </template>
  <script>
  import axios from 'axios';
  import { ElMessageBox } from 'element-plus';


  export default {
    name: 'NewsManagement',
    data() {
      return {
        newsList: [
          // 从服务器获取的资讯列表数据
        ],
        formNews:{
          title: '',
          content: '', 
          date: '', 
        },
        dialogVisible: false, // 控制模态框显示
        currentNews: {}, // 当前正在编辑的资讯项目
        isEditMode: false, // 默认不是编辑模式

      };
    },
    created()
    {
      this.updateNewsList();
    },
    methods: {
      handleAddNews() {
        // this.currentNews = {}; // 清空当前资讯
        this.dialogVisible = true; // 显示添加资讯的表单模态框
        this.isEditMode = false; // 表示现在是添加模式
        
      },

      handleEditNews(news) {
        console.log(news)
        this.dialogVisible = true; // 显示编辑资讯的表单模态框
        this.isEditMode = true; // 表示现在是编辑模式
        this.currentNews = Object.assign({}, news); // 设置当前资讯为所点击的资讯
        this.formNews = this.currentNews;

      },
      handleDeleteNews(news) {
        const newsId = news.id; // 假设每条资讯都有一个id属性

        // 使用Element Plus的MessageBox来确认是否删除资讯
        ElMessageBox.confirm(`确定要删除标题为 "${news.title}" 的资讯吗？`, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          axios.delete(`http://localhost:3000/api/news/${newsId}`)
          .then(response => {
            console.log(response)
            // 如果后端返回成功状态，更新前端的newsList
            this.newsList = this.newsList.filter(item => item.id !== newsId);
            this.$message({
              type: 'success',
              message: '资讯已删除',
            });
          })
          .catch(error => {
            console.error("删除资讯时出现错误：", error);
            this.$message.error('资讯删除失败');
          });
        }).catch(() => {
          console.log('资讯删除操作已取消');
        });
      },

      // 获取最新的资讯列表（从服务器重新获取数据）
      updateNewsList() {
        // TODO: 实现资讯列表的更新逻辑
        axios.get('http://localhost:3000/api/news')
          .then(response => {
            this.newsList = response.data; // 假设服务器返回的新资讯列表在response.data中
          })
          .catch(error => {
            console.error("获取资讯列表失败：", error);
          });
      },

      addNews() {
        console.log(this.formNews)
        // 发送POST请求到后端API，提交新资讯的数据
        axios.post('http://localhost:3000/api/news', this.formNews)
        .then(response => {
          console.log(response)
          this.$message.success('资讯添加成功！');
          // TODO: 处理响应，例如更新本地资讯列表，关闭模态框
          this.updateNewsList();
          this.dialogVisible = false;
        })
        .catch(error => {
          // TODO: 处理错误情况
          console.error("添加资讯失败：", error);
        });
      },
      submitNewsEdit()
      {
        axios.put(`http://localhost:3000/api/news/${this.formNews.id}`, this.formNews)
          .then(response => {
            console.log(response)
            this.dialogVisible = false; // 关闭对话框
            // 可以在这里更新前端显示的资讯列表，或者弹窗提示用户更新成功
            this.$message({
              type: 'success',
              message: '资讯更新成功!',
            });
            // 可能需要重新加载或更新资讯列表
          })
          .catch(error => {
            console.error("更新资讯时出现错误：", error);
            this.$message.error('资讯更新失败');
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .news-management {
    padding: 20px;
  }
  </style>