<template>
  <div class="header-container">
    <div class="logo"></div>
    <h1 class="login-title">艺术学校约课管理系统</h1>
  </div>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin" v-if="!isRegistering">
      <!-- 在这里显示错误消息 -->
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <div class="form-group">
        <label for="role">角色:</label>
        <select id="role" v-model="loginForm.role" required>
          <option disabled value="">请选择角色</option>
          <option value="student">学生/家长</option>
          <option value="teacher">老师</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <div class="form-group">
        <label for="username">用户名:</label>
        <input
          type="text"
          id="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input
          type="password"
          id="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          required
        />
      </div>
      <div class="form-group button-group">
        <button type="submit" class="login-button">立即登录</button>
        <button type="button" class="register-button" @click="switchToRegister">还没有账号?立即注册</button>
      </div>
    </form>
  
    <!--注册页面 -->
    <form class="register-form" @submit.prevent="handleRegister" v-if="isRegistering" autocomplete="off">
      <h2>注册页面</h2>
      <div class="form-group">
          <label for="role-register">角色:</label>
          <select id="role-register" v-model="registerForm.role" required>
              <option disabled value="">请选择角色</option>
              <option value="student">学生</option>
              <option value="teacher">老师</option>
              <!-- <option value="admin">管理员</option> -->
          </select>
      </div>
      <div class="form-group">
          <label for="username-register">请输入用户名:</label>
          <input type="text" id="username-register-randomstring" v-model="registerForm.username" required />
      </div>
      <div class="form-group">
          <label for="password-register">请输入密码:</label>
          <input type="password" id="password-register-randomstring" v-model="registerForm.password" required />
      </div>
      <div class="form-group">
        <!--新添加的二次输入密码的表单 -->
        <label for="confirm-password-register">请再次输入密码:</label>
        <input
          type="password"
          id="confirm-password-register"
          v-model="registerForm.confirmPassword"
          required
        />
      </div>
      <!--添加注册和返回登录按钮 -->
      <div class="form-group button-group">
          <button type="submit" class="register-button">注册</button>
          <button type="button" class="back-button" @click="switchToLogin">返回登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'; // 引入axios
import { ElNotification } from 'element-plus';

export default {
  name: 'LoginComponent',
  data() {
    return {
      loginForm: {
        role: '',
        username: '',
        password: ''
      },
      registerForm: {
        role: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      loginError: '', // 用于捕获并显示登录错误
      isRegistering: false,   // 默认处于登录模式
    };
  },
  methods: {
    async handleLogin() {
      // 构建登录请求的URL
      const loginUrl = 'http://localhost:3000/login';
      // 定义要发送到服务器的登录数据
      const loginData = {
        role: this.loginForm.role,
        username: this.loginForm.username,
        password: this.loginForm.password,
      };

      try {
        // 使用 axios 发送POST请求到登录URL，并带上登录数据
        const response = await axios.post(loginUrl, loginData);
        // 如果请求成功，处理登录成功的情况（例如跳转到另一个路由、显示欢迎信息等）
        console.log('登录成功：', response.data);
        // 从响应中提取token并存储到localStorage
        const token = response.data.token;
        localStorage.setItem('userToken', token); // 将token保存到localStorage中
        console.log('Token is', token);
        // 存储用户角色到本地存储
        localStorage.setItem('userRole', this.loginForm.role);
        // 存储用户名到本地存储
        localStorage.setItem('userName', this.loginForm.username);

        // 如果返回的数据中有 adminFlag 并且值为 true，那么跳转到管理员页面
        if (response.data.adminFlag) {
          this.$router.push('/adminDashboard');
        } else if (response.data.teacherFlag) {
          // 否则跳转到普通用户页面
          this.$router.push('/dashboard');
        }else{
          this.$router.push('/StudentDashboard');
        }
      } catch (error) {
        // 如果请求失败，处理错误情况
        this.loginError = '用户名或密码错误'; // 设置一个通用的错误消息
        if (error.response && error.response.data){
          this.loginError = error.response.data;
        }
      }
    },
    handleRegister() {
      // 验证用户名
      if (!this.registerForm.username) {
        ElNotification({
            title: '错误',
            message: '用户名不能为空',
            type: 'error'
             });
            return;
      }

      // 验证密码
      if (!this.registerForm.password) {
        ElNotification({
            title: '错误',
            message: '密码不能为空',
            type: 'error'
            });
            return;
      }

      // 验证二次输入密码是否与第一次输入一致
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
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
        username: this.registerForm.username,
        password: this.registerForm.password,
        role: this.registerForm.role,
        confirmPassword: this.registerForm.confirmPassword
      })
      .then(response => {

        console.log(response)
        // 根据你的 API 返回值进行操作，例如，如果注册成功，则切换回登录界面
        if (response.status == 200 ) {
          this.isRegistering = false;         
          ElNotification({
                title: '成功',
                message: `注册成功，请登录`,
                type: 'success'
                });
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
        console.log(error);
            ElNotification({
            title: '错误',
            message: '注册失败，服务器错误',
            type: 'error'
        });
      });
    },
    switchToRegister() {
      this.isRegistering = true;
    },
    switchToLogin() {
      this.isRegistering = false;
    },
  }
};
</script>

<style scoped>
.login-container {
  max-width: 320px;
  margin: 50px auto;
  padding: 2em;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #efefef;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login-title {
  font-family: 'Brush Script MT', cursive; /* 艺术风格的字体 */
  text-align: center;
  color: #6a1b9a; /* 艺术学校风格颜色 */
  margin-bottom: 1.5em;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  color: #333;
  margin-bottom: 0.5em;
}

.form-group input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  padding: 0.75em 1.5em;
  background-color: #509cff; /* 艺术学校主题色 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #001b96; /* 鼠标悬停颜色加深 */
}

.register-button
{
  padding: 0.75em 1.5em;
  background-color: #509cff; /* 艺术学校主题色 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

}

.register-button:hover {
  background-color: #001b96; /* 鼠标悬停颜色加深 */
}

.button-group {
  display: flex;
  justify-content: space-around;
}

/* 新添加的下拉菜单样式 */
.form-group select {
  width: 100%;
  padding: 0.75em;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none; /* 移除原有的选择框样式 */
  position: relative;
  background-image: linear-gradient(45deg, transparent 50%, #333 50%),
                    linear-gradient(135deg, #333 50%, transparent 50%),
                    linear-gradient(to right, #dcdcdc, #dcdcdc);
  background-position: calc(100% - 20px) calc(1em + 2px), 
                       calc(100% - 15px) calc(1em + 2px),
                       calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

/* 美化下拉菜单当鼠标悬停在上面时 */
.form-group select:hover {
  border-color: #b2b2b2;
}

/* 当下拉菜单被点击时 */
.form-group select:focus {
  outline: none;
  border-color: #7b1fa2; /* 使用艺术学校的主题色 */
}

.error-message {
  color: #e74c3c; /* 红色错误提示 */
  margin-bottom: 1em;
  text-align: center;
}



.header-container {
  display: flex; 
  flex-direction: column; 
  align-items: center;
}



.logo {
  /* Logo样式，根据需求来定义尺寸 */
  background-image: url('~@/assets/b9871091f1591d50.png');
  background-size: cover;
  justify-content: center;
  height: 138px;
  width: 670px;
  margin-top: 250px;
  margin-bottom: 20px;
}
</style>