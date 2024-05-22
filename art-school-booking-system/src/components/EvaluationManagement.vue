<template>
  <div>
    <h1>评价管理</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="选择课程或教师">
        <el-select v-model="form.target" placeholder="请选择">
          <el-option
            v-for="item in targets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评价">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EvaluationManagement',
  data() {
    return {
      form: {
        target: '',
        content: '',
      },
      targets: [],
    };
  },
  created()
  {
    this.username = localStorage.getItem('userName');

  },
  async mounted() {
    try { 
      let username = this.username
      const res = await axios.get(`http://localhost:3000/api/course_completion?username=${username}`);
        this.targets = res.data.map(item => ({value: item.title, label: item.teacher}));
    } catch(err) {
      console.error(err);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          // 这里可以添加你的提交表单代码
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>