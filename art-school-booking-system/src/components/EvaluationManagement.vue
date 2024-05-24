<!-- <template>
  <div>
    <h1>评价管理</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="选择课程和教师">
        <el-select v-model="form.target" placeholder="请选择" @change="handleSelectChange">
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
      const username = this.username
      const res = await axios.get(`http://localhost:3000/api/course_completion?username=${username}`);
      this.targets = res.data.map(item => ({value: `${item.title} (${item.teacher})`, label: `${item.title} (${item.teacher})`}));
      this.form.target = this.targets.
      console.log(this.targets)
    } catch(err) {
      console.log(err);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提交表单代码
          try {
            const res = await axios.post('http://localhost:3000/api/evaluations', this.form);
            console.log(res.data); // 打印返回的数据，可根据实际情况省略
            this.$message.success('提交成功！');
          } catch (err) {
            console.error(err);
            this.$message.error('提交失败，请稍后重试！');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectChange(selectedValue) {
        console.log(selectedValue);
      }
  },
};
</script> -->

<template>
  <div>
    <h1>评价管理</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="选择课程和教师">
        <el-select v-model="form.target" placeholder="请选择" @change="handleSelectChange">
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

    <el-radio-group v-model="displayMode" @change="updateTargets">
      <el-radio-button label="显示课程"></el-radio-button>
      <el-radio-button label="显示教师"></el-radio-button>
    </el-radio-group>
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
        username: '', // add username to the form
        course_name: '', // add course_name to the form
      },
      targets: [],
      originalData: [], // 保存原始数据
      displayMode: '显示课程', // 控制显示模式，可以是"显示课程"或者"显示教师"
    };
  },
  created() {
    this.form.username = localStorage.getItem('userName'); // 获取用户名并赋值给 form
  },
  async mounted() {
    try {
      const username = this.form.username;
      const res = await axios.get(`http://localhost:3000/api/course_completion?username=${username}`);
      this.originalData = res.data;
      this.updateTargets(); // 根据初始 displayMode 设置 targets
      console.log(this.targets);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提交表单代码
          try {
            const res = await axios.post('http://localhost:3000/api/evaluations', this.form);
            console.log(res.data); // 打印返回的数据，可根据实际情况省略
            this.$message.success('提交成功！');
          } catch (err) {
            console.error(err);
            this.$message.error('您已经提交过对该课程或该老师的评论了！');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectChange(selectedValue) {
      this.form.course_name = this.extractCourseName(selectedValue); // 更新选中的 course_name
      console.log(selectedValue);
    },
    extractCourseName(target) {
      // 提取课程名的逻辑，根据你保存数据的方式修改
      // 例如，如果 target 是“CourseName (TeacherName)”格式，你可以用下面的代码提取课程名：
      return target.split(' (')[0];
    },
    updateTargets() {
      // 根据 displayMode 更新 targets 内容
      if (this.displayMode === '显示课程') {
        this.targets = this.originalData.map(item => ({
          value: item.title + ' (' + item.teacher + ')',
          label: item.title + ' (' + item.teacher + ')',
        }));
      } else {
        this.targets = this.originalData.map(item => ({
          value: item.title + ' (' + item.teacher + ')',
          label: item.teacher,
        }));
      }
    }
  },
};
</script>