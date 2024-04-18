<template>
  <div>
    <el-table :data="userList">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="showEditUserDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showDialog">
      <el-form ref="form" :model="editUser" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="editUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword" type="password" placeholder="输入新密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editUser.role" placeholder="选择角色">
            <el-option label="老师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="updateUser">确定</el-button>
      </template>
    </el-dialog>
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
        editUser: {
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
      // 显示编辑用户信息的弹框
      showEditUserDialog(user) {
        this.editUser = Object.assign({}, user); //使用assign避免对象引用问题
        console.log(this.editUser )
        this.showDialog = true;
      },
      // 更新用户信息
      updateUser() {
        axios.put(`http://localhost:3000/api/updateUsers/${this.editUser.id}`, this.editUser) //请求你的接口
          .then(() => {
            ElNotification.success({
              title: '成功',
              message: '更新成功！',
            });
            this.showDialog = false;
            this.getUserList(); //更新后请求最新的用户信息
          })
          .catch( error => {
            // 显示错误信息
            const message = error.response && error.response.data && error.response.data.message
                            ? error.response.data.message // 如果服务器返回错误信息，就显示这个信息
                            : '更新失败！';  // 如果没有详细错误信息，显示默认信息
            ElNotification.error({
              title: '错误',
              message: message
            });
          });
      }
    }
  }
  </script>