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
export default {
  name: 'EvaluationManagement',
  data() {
    return {
      form: {
        target: '',
        content: '',
      },
      targets: [
        //你可以修改这些选项以匹配你的课程或教师名单
        {value: 'option1', label: '课程1'},
        {value: 'option2', label: '课程2'},
        {value: 'option3', label: '教师1'},
        {value: 'option4', label: '教师2'},
      ],
    };
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