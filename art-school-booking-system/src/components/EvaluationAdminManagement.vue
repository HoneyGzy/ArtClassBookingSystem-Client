<template>
  <div class="evaluation-management">
    <el-table :data="formattedEvaluationList" style="width: 100%" empty-text="暂无评价">
      <el-table-column prop="teacher" label="老师"></el-table-column>
      <el-table-column prop="course_name" label="课程名称"></el-table-column>
      <el-table-column prop="comment" label="评价内容"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEditEvaluation(scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDeleteEvaluation(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑评价" v-model="dialogVisible">
      <!-- 这里插入您之前提供的添加/编辑评价的表单模板 -->
      <div id="latest-evaluations">
        <el-form class="evaluation-form" ref="formEvaluation" :model="formEvaluation" label-position="top">
          <h3>最新评价</h3>
          
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="老师" prop="teacher">
                <el-input v-model="formEvaluation.teacher"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="课程名称" prop="course_name">
                <el-input v-model="formEvaluation.course_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="评价内容" prop="comment">
            <el-input type="textarea" v-model="formEvaluation.comment"></el-input>
          </el-form-item>
    
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formEvaluation.username"></el-input>
          </el-form-item>
    
          <el-button
            type="primary"
            @click="isEditMode ? submitEvaluationEdit() : addEvaluation()"
          >
            {{ isEditMode ? '修改评价' : '发布评价' }}
          </el-button>
        </el-form>
      </div>
    </el-dialog>

    <el-button type="primary" @click="handleAddEvaluation">添加评价</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

export default {
  name: 'EvaluationManagement',
  data() {
    return {
      evaluationList: [
        // 从服务器获取的评价列表数据
      ],
      formEvaluation: {
        id: '',
        teacher: '',
        course_name: '',
        comment: '',
        username: ''
      },
      dialogVisible: false, // 控制模态框显示
      currentEvaluation: {}, // 当前正在编辑的评价项目
      isEditMode: false, // 默认不是编辑模式
    };
  },
  created() {
    this.updateEvaluationList();
  },
  computed: {
    formattedEvaluationList() {
      return this.evaluationList;
    }
  },
  methods: {
    handleAddEvaluation() {
      this.currentEvaluation = {}; // 清空当前评价
      this.dialogVisible = true; // 显示添加评价的表单模态框
      this.isEditMode = false; // 表示现在是添加模式
    },
    handleEditEvaluation(evaluation) {
      this.dialogVisible = true; // 显示编辑评价的表单模态框
      this.isEditMode = true; // 表示现在是编辑模式
      this.currentEvaluation = Object.assign({}, evaluation); // 设置当前评价为所点击的评价
      this.formEvaluation = this.currentEvaluation;
    },
    handleDeleteEvaluation(evaluation) {
      const evaluationId = evaluation.id; // 假设每条评价都有一个id属性

      // 使用Element Plus的MessageBox来确认是否删除评价
      ElMessageBox.confirm(`确定要删除评价吗？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        axios.delete(`http://localhost:3000/api/evaluations/${evaluationId}`)
          .then(response => {
            console.log(response)
            // 如果后端返回成功状态，更新前端的evaluationList
            this.evaluationList = this.evaluationList.filter(item => item.id !== evaluationId);
            this.$message({
              type: 'success',
              message: '评价已删除',
            });
          })
          .catch(error => {
            console.error("删除评价时出现错误：", error);
            this.$message.error('评价删除失败');
          });
      }).catch(() => {
        console.log('评价删除操作已取消');
      });
    },
    // 获取最新的评价列表（从服务器重新获取数据）
    updateEvaluationList() {
      axios.get('http://localhost:3000/api/evaluations')
        .then(response => {
          this.evaluationList = response.data; // 假设服务器返回的新评价列表在response.data中
        })
        .catch(error => {
          console.error("获取评价列表失败：", error);
        });
    },
    addEvaluation() {
      console.log(this.formEvaluation)
      // 发送POST请求到后端API，提交新评价的数据
      axios.post('http://localhost:3000/api/evaluations', this.formEvaluation)
        .then(response => {
          console.log(response)
          this.$message.success('评价添加成功！');
          // TODO: 处理响应，例如更新本地评价列表，关闭模态框
          this.updateEvaluationList();
          this.dialogVisible = false;
        })
        .catch(error => {
          // TODO: 处理错误情况
          console.error("添加评价失败：", error);
        });
    },
    submitEvaluationEdit() {
      axios.put(`http://localhost:3000/api/evaluations/${this.formEvaluation.id}`, this.formEvaluation)
        .then(response => {
          console.log(response)
          this.dialogVisible = false; // 关闭对话框
          // 可以在这里更新前端显示的评价列表，或者弹窗提示用户更新成功
          this.updateEvaluationList();
          this.$message({
            type: 'success',
            message: '评价更新成功!',
          });
          // 可能需要重新加载或更新评价列表
        })
        .catch(error => {
          console.error("更新评价时出现错误：", error);
          this.$message.error('评价更新失败');
        });
    }
  }
};
</script>

<style scoped>
.evaluation-management {
  padding: 20px;
}
</style>