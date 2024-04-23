<template>
    <div ref="container">
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
            <el-row :gutter="20">
              <CourseCard
                  v-for="course in searchResults"
                  :key="course.id"
                  :searchResults="[course]"
              >
                <template #extra>
                  <div>
                    <el-progress :percentage="getCourseStatus(course).progress"></el-progress>
                    <el-tag>{{ getCourseStatus(course).tag }}</el-tag>
                  </div>
                </template>
              </CourseCard>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="喜好设置" name="preferences">
            <el-checkbox v-model="user.preferences">开启通知</el-checkbox>
          </el-tab-pane>
          <el-tab-pane label="交易记录" name="transactions">
            <table>
              <thead>
                <tr>
                  <th>课程标题</th>
                  <th>支付状态</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td>{{ transaction.courseTitle }}</td>
                  <td>{{ transaction.paymentStatus }}</td>
                  <td>{{ transaction.price }}</td>
                </tr>
              </tbody>
            </table>
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
      transactions:[],
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
      console.log(this.username)
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
    getCourseStatus(course) {
      console.log(course)
      // 解析课程日期
      const courseDate = new Date(course.date);
      // 获取当前日期
      const now = new Date();
      // 如果课程状态为预约成功
      if (course.reservationStatus === '预约成功') {
        // 检查课程日期是否在当前日期之后
        if (courseDate > now) {
          // 如果课程还没有开始，返回30%的进度和预约成功未开课的标签
          return {
            progress: 30,
            tag: '预约成功，未开课'
          };
        } else {
          // 如果课程已经开始，返回100%的进度和课程已完成的标签
          return {
            progress: 100,
            tag: '课程已完成'
          };
        }
      } else {
        // 如果预约未成功，返回0%的进度和预约未成功的标签
        return {
          progress: 0,
          tag: '预约未成功'
        };
      }
    },
    handleTabClick(tab) {
      console.log(tab);
      console.log(tab.props.name)
      switch(tab.props.name) {
        case 'profile':
          // 执行个人信息页签被点击时的逻辑
          break;
        case 'courses':
          this.fetchCourses();
          break;
        case 'history':
          this.fetchHistory();
          break;
        case 'progress':
          this.fetchHistory();
          break;
        case 'preferences':
          this.fetchHistory();
          break;
        case 'transactions':
          this.fetchPaylist();
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