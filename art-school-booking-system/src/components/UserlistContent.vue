<template>
    <div>
      <table v-if="users && users.length" class="user-table">
        <thead>
          <tr>
            <th>角色</th>
            <th>用户名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.username">
            <td>{{ user.role }}</td>
            <td>{{ user.username }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>无用户显示。</p>
    </div>
  </template>
  
 
   <!-- <template>
    <div>
      <div v-if="students.length">
        <h2>学生</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>用户名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.username">
              <td>{{ student.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="teachers.length">
        <h2>教师</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>用户名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.username">
              <td>{{ teacher.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="admins.length">
        <h2>管理员</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>用户名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin in admins" :key="admin.username">
              <td>{{ admin.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>无用户显示。</p>
    </div>
  </template> -->

  <script>
import axios from 'axios';

  export default {
    name:'userlistComponent',
    data() {
      return {
        users: [], // 用户信息列表
        students: [],
        teachers: [],
        admins: []
      };
    },
    created() {
      this.fetchUsers(); // 在组件创建时获取用户信息
    },
    watch: {
        
        users(newUsers) {
        if (newUsers && newUsers.length) {
            this.students = newUsers.filter(user => user.role === 'student').sort((a, b) => a.username.localeCompare(b.username));
            this.teachers = newUsers.filter(user => user.role === 'teacher').sort((a, b) => a.username.localeCompare(b.username));
            this.admins = newUsers.filter(user => user.role === 'admin').sort((a, b) => a.username.localeCompare(b.username));
            }
        }
    },
    methods: {
        fetchUsers() {
        axios.get('http://localhost:3000/api/getusers')
        .then(response => {
            // 假设API的响应是一个包含用户的数组
            this.users = response.data;
        })
        .catch(error => {
            console.error(`在获取用户数据时出错: ${error}`);
        });
        },
    },
  };
  </script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #4caf50;
  color: white;
}

/* .user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.user-table th {
  background-color: #4caf50;
  color: white;
}

h2 {
  margin-top: 25px;
} */
</style>