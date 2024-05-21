<template>
  <div class="form-container">
    <h2>添加用户</h2>

    <el-form @submit.prevent="handleSubmit" class="form-fields">

      <el-form-item label="角色">
        <el-select v-model="role" placeholder="选择角色">
          <el-option disabled value="">选择角色</el-option>
          <el-option label="学生" value="student"></el-option>
          <el-option label="教师" value="teacher"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="password" placeholder="输入密码"></el-input>
      </el-form-item>

      <el-form-item label="再次输入密码">
        <el-input type="password" v-model="confirmPassword" placeholder="再次输入密码"></el-input>
      </el-form-item>

      <el-form-item v-if="role == 'teacher'" label="教师ID">
        <el-input v-model="teacherId" placeholder="输入教师ID"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>
  
  <script>
import axios from 'axios'; // 引入axios
import { ElNotification } from 'element-plus';

export default {
    data() {
      return {
        username: '',
        role: '',
        password: '',
        confirmPassword: '',
        teacherId: '',    // 新的数据项：teacherId  
      };
    },
    
    methods: {
      handleSubmit() {
            // 验证用户名
        if (!this.username) {
            ElNotification({
            title: '错误',
            message: '用户名不能为空',
            type: 'error'
             });
            return;
        }

        // 验证密码
        if (!this.password) {
            ElNotification({
            title: '错误',
            message: '密码不能为空',
            type: 'error'
            });
            return;
        }

        // 验证二次输入密码是否与第一次输入一致
        if (this.password !== this.confirmPassword) {
            ElNotification({
            title: '错误',
            message: '两次输入的密码不一致，请重新输入',
            type: 'error'
            });
            return;
        }
        // 发送注册请求
        // 这里假设你有一个名为 register 的 API 可以进行注册操作
        axios.post('http://localhost:3000/api/register', {
            username: this.username,
            password: this.password,
            role: this.role,
            confirmPassword: this.confirmPassword,
            teacherId: this.teacherId     // 传递 teacherId
        })
        .then(response => {

            console.log(response)
            // 根据你的 API 返回值进行操作，例如，如果注册成功，则切换回登录界面
            if (response.status == 200 ) {
                ElNotification({
                title: '成功',
                message: `添加了一个名为 ${this.username} 的新 ${this.role}`,
                type: 'success'
                });
                this.username = '';
                this.role = '';
                this.password = '',
                this.confirmPassword = ''
            } else {
            // 如果注册失败，向用户显示错误信息
            ElNotification({
                title: '错误',
                message: response.data.message,
                type: 'error'
                });
            }
        })
        .catch(error => {
            console.log(error);
            ElNotification({
            title: '错误',
            message: '注册失败，服务器错误',
            type: 'error'
        });
        });
      }
    }
  };
  </script>
  
  <style scoped>
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      background: #f0f2f5;
      font-family: Arial, sans-serif;
    }
  
    h2 {
      margin-bottom: 1em;
      color: #333;
    }
  
    .form-fields {
      width: 300px;
      padding: 2em;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.1);
    }
  
    .field {
      margin-bottom: 1em;
    }
  
    label {
      display: block;
      margin-bottom: .5em;
      color: #333333;
      font-size: .85em;
    }
  
    input,
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      font-size: 1em;
      color: #333333;
    }
  
    button {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      background-color: #0076ff;
      color: #ffffff;
      border-radius: 4px;
      font-size: 1em;
      cursor: pointer;
      transition: background-color ease .3s;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>