<template>
    <div>
        <h2>用户中心</h2>
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="个人信息" name="profile">
              <el-form :model="user" :rules="rules" ref="form" label-width="120px">
                <el-form-item label="名字" prop="name">
                  <el-input v-model="user.name" placeholder="请输入名字" ></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email" placeholder="请输入邮箱" ></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="user.phone" placeholder="请输入手机号" ></el-input>
                </el-form-item>

                <el-form-item label="注册时间" prop="registerTime">
                  <el-date-picker v-model="user.registerTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="user.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="父母名字" prop="parentsName">
                  <el-input v-model="user.parentsName" placeholder="请输入父母名字" ></el-input>
                </el-form-item>

                <el-form-item label="父母电话" prop="parentsPhone">
                  <el-input v-model="user.parentsPhone" placeholder="请输入父母的电话号码" ></el-input>
                </el-form-item>

                <el-form-item label="生日" prop="birthday">
                  <el-date-picker v-model="user.birthday" type="date" placeholder="选择生日" ></el-date-picker>
                </el-form-item>

                <el-form-item label="家庭住址" prop="address">
                  <el-input v-model="user.address" placeholder="请输入家庭住址" ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('form')">提交</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>
          <el-tab-pane label="我的预约" name="courses">
            <el-row :gutter="20">
              <CourseCard :searchResults="searchResults">
                <template #extra>
                  <el-tag type="success">已预约</el-tag>
                </template>
              </CourseCard>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="购课历史" name="history">
            <el-row :gutter="20">
              <CourseCard :searchResults="searchResults">
                <template #extra>
                  <el-tag type="success">已购课</el-tag>
                </template>
              </CourseCard>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="学习进度" name="progress">
          <div>
            {{ user.progress }}% 
          </div>
          </el-tab-pane>
          <el-tab-pane label="喜好设置" name="preferences">
            <el-checkbox v-model="user.preferences">开启通知</el-checkbox>
          </el-tab-pane>
          <el-tab-pane label="交易记录" name="transactions">
            <div v-for="transaction in user.transactions" :key="transaction.id">
              {{ transaction.amount }} - {{ transaction.date }}
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import CourseCard from './CourseCard.vue';
import axios from 'axios';

export default {
  components: {
    CourseCard
  },
  data() {
    return {
      activeTab: "profile",
      user: {
        name: "",
        email: "",
        phone: "",
        registerTime: "",
        gender: "",
        parentsName: "",
        parentsPhone: "",
        birthday: "",
        address: "",
      },
      searchResults:{},
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入有效的邮箱地址", trigger: ["blur", "change"] }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur" }
        ],
        // 可以添加其他字段的验证规则
      }
    };
  },

  created() {
      this.username = localStorage.getItem('userName');
      console.log(this.username)
  },

  methods: {
    handleTabClick(tab) {
      console.log(tab);
      console.log(tab.name)
      switch(tab.name) {
        case 'profile':
          // 执行个人信息页签被点击时的逻辑
          break;
        case 'courses':
          console.log(11111111111)
          this.fetchCourses();
          break;
        case 'history':
          // 执行购课历史页签被点击时的逻辑
          break;
        case 'progress':
          // 执行学习进度页签被点击时的逻辑
          break;
        case 'preferences':
          // 执行喜好设置页签被点击时的逻辑
          break;
        case 'transactions':
          // 执行交易记录页签被点击时的逻辑
          break;
        default:
          // 默认行为
          break;
        }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fetchCourses() {
        const users = this.username;
        axios.get(`http://localhost:3000/api/courseregistration`, {
          params: {
            username: users
          }
        })
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error(error);
          // 添加错误处理
        })
      },
    }
};
</script>