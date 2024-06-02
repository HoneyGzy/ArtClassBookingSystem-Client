<template>
  <div ref="container">
      <h2>教师中心</h2>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="个人信息" name="profile">
            <el-form :model="user" :rules="rules" ref="form" label-width="120px">
              <el-form-item label="教师ID" prop="teacherId">
                <el-input v-model="user.teacher_id" placeholder="教师ID" disabled></el-input>
              </el-form-item>

              <el-form-item label="名字" prop="name">
                <el-input v-model="user.name" placeholder="请输入名字" ></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email" placeholder="请输入邮箱" ></el-input>
              </el-form-item>

              <el-form-item label="手机号" prop="phone">
                <el-input v-model="user.phone" placeholder="请输入手机号" ></el-input>
              </el-form-item>
              
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="user.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
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
      </el-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
name: 'UsercenterCoponent',
data() {
  return {
    activeTab: "profile",
    isProfileCompleted: false,
    user: {
      teacher_id: "",
      name: "",
      username: "",
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
    transactions:[],
    rules: {
      // name: [
      //   { required: true, message: "请输入名字", trigger: "blur" }
      // ],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "请输入有效的邮箱地址", trigger: ["blur", "change"] }
      ],
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur" }
      ],
      // 可以添加其他字段的验证规则
    },
    resizeObserver: null, // 存储resizeObserver实例
  };
},

mounted() {
  // 假设你想观察的元素是一个名为 container 的 div
  this.resizeObserver = new ResizeObserver(entries => {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      // 在这里编写你对尺寸变化的处理逻辑
      console.log(entries[0].contentRect);
    });
  });

  // 开始观察
  if (this.$refs.container) {
    this.resizeObserver.observe(this.$refs.container);
  }
},

created() {
    this.username = localStorage.getItem('userName');
    this.checkProfileCompletion(this.username);
},


unmounted() {
  // 或者在Vue 3中使用 unmounted
  // 停止观察并进行清理
  if (this.$refs.container && this.resizeObserver) {
    this.resizeObserver.unobserve(this.$refs.container);
  }
},

methods: {
  formatDate(row, column, cellValue) {
    return new Date(cellValue).toLocaleString();
  },
  checkProfileCompletion(username) {
    // 先查询第一个接口
    axios.get(`http://localhost:3000/api/user/profile?username=${username}`)
      .then(response => {
        let userProfile = response.data;
        console.log("First API response:", userProfile);  // 打印返回的完整数据以检查它的结构
        this.user = userProfile;
        this.user.name = userProfile.teacher;  // 假设 `teacher` 字段是我们需要的数据
        this.isProfileCompleted = true;
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // 如果第一个接口返回404错误，则查询第二个接口
          return axios.get(`http://localhost:3000/api/getuser/?username=${username}`);
        } else {
          // 对500等其他错误进行处理
          console.error("Error fetching user profile from first API:", error);
          return null;  // 终止Promise链
        }
      })
      .then(response => {
        if (response) {
          let userProfile = response.data;
          console.log("Second API response:", userProfile);  // 打印返回的完整数据以检查它的结构
          if (userProfile) {
            this.isProfileCompleted = true;
            this.user = userProfile;
            this.user.name = userProfile.teacher;  // 假设 `teacher` 字段是我们需要的数据
          } else {
            console.error("User profile not found");
          }
        }
      })
      .catch(error => {
        console.error("Error fetching user profile from second API:", error);
      });
  },
  handleTabClick(tab) {
    console.log(tab);
    console.log(tab.props.name)
    switch(tab.props.name) {
      case 'profile':
        this.checkProfileCompletion(this.username);
        // 执行个人信息页签被点击时的逻辑
        break;
      default:
        // 默认行为
        break;
      }
  },
  async submitForm(formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        try {
          this.user.username = this.username;
          const response = await axios.post('http://localhost:3000/api/user/profile', this.user);
          console.log(response)
          this.isProfileCompleted = true;
          console.log("Successfully submitted user profile.");
        } catch (error) {
          console.error("Error submitting user profile:", error);
        }
      } else {
        console.log("Error submit!!");
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

    fetchHistory() {
      const users = this.username;
      axios.get(`http://localhost:3000/api/paycourseregistration`, {
        params: {
          username: users
        }
      })
      .then(response => {
        this.searchResults = response.data;
         // 对返回的数据进行处理，只保留关心的属性
         this.transactions = response.data.map(item => ({
          courseTitle: item.courseTitle, 
          paymentStatus: item.paymentStatus, 
          price: item.price
        }));
      })
      .catch(error => {
        console.error(error);
        // 添加错误处理
      })
    },
    fetchPaylist() {
    const users = this.username;
    axios.get(`http://localhost:3000/api/paycourseregistration`, {
      params: {
        username: users
      }
    })
    .then(response => {
      this.transactions = response.data;
      // 使用 Vue 的 nextTick 方法等待 DOM 更新
      this.$nextTick(() => {
        // 执行可能影响布局的代码
      });
    })
    .catch(error => {
      console.error(error);
    });
  }
  }
};
</script>


<style scoped>

table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;
}

th {
background-color: #f2f2f2;
}

</style>