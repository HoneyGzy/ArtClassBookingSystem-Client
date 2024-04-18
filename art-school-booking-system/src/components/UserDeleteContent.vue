<template>
    <div>
      <el-table :data="userList">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeleteUserDialog(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
    <script>
    import { ElNotification } from 'element-plus';
    import axios from 'axios';
    
    export default {
      data() {
        return {
          userList: [], //存储用户列表
          showDialog: false, //是否显示编辑弹框
          deleteUser: {
            username: '',
            role: '',
          }, //存储被编辑的用户信息
          newPassword: '',
        };
      },
      created() {
        this.getUserList(); //请求所有用户信息
      },
      methods: {
        // 获取所有用户
        getUserList() {
          axios.get('http://localhost:3000/api/getusers') //请求你的接口
            .then(response => {
              this.userList = response.data;
            })
        },
        // 删除用户的接口
        showDeleteUserDialog(user) {
          this.deleteUser = Object.assign({}, user); //使用assign避免对象引用问题
          axios.delete(`http://localhost:3000/api/deleteUsers/${this.deleteUser.id}`) //请求你的接口
            .then(() => {
              ElNotification.success({
                title: '成功',
                message: '删除成功！',
              });
              this.showDialog = false;
              this.getUserList(); //更新后请求最新的用户信息
            })
            .catch( error => {
              // 显示错误信息
              const message = error.response && error.response.data && error.response.data.message
                              ? error.response.data.message // 如果服务器返回错误信息，就显示这个信息
                              : '删除失败！';  // 如果没有详细错误信息，显示默认信息
              ElNotification.error({
                title: '错误',
                message: message
              });
            });
        },
      }
    }
    </script>