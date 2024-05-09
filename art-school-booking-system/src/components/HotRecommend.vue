<template>
  <div id="hot-recommend">
    <h2 class="recommend-title">热门推荐</h2>
    <el-carousel interval="2000" arrow="always">
      <el-carousel-item
        v-for="(item, index) in hotList"
        :key="index"
        @click="redirectItem(item.link)"
      >
        <div>
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="item-image"
          >
          <h3 class="item-title">{{ item.title }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import axios from 'axios';
export default {
   name: 'HotRecommendContent',
   components: {
      ElCarousel,
      ElCarouselItem,
   },
   data() {
      return {
         hotList: [] // 热门课程列表
      }
   },
   created() {
    this.fetchCourses();
  },
  methods: {
      redirectItem(link) {
         window.location.href = link;
      },
      fetchCourses() {
        axios.get('http://localhost:3000/api/courses_images')
          .then(response => {
            if(!response.data || !Array.isArray(response.data)) {
              console.error("Invalid API response");
              return;
            }
            this.hotList = response.data.map(course => {
              if (course.image && course.image.data) {
                // Convert the ASCII values in the array to a string
                var imagePath = course.image.data.map(c => String.fromCharCode(c)).join('');
                
                // Create the URL to the image
                course.image = 'http://localhost:3000/' + imagePath;
                console.log(course.image)
              }
              console.log(`Course title: ${course.title}`);
              console.log(`Image URL: ${course.image}`);

              
              return course;
            });
          })
          .catch(error => {
            console.error(error);
          })
      },
   }
};
</script>

<style scoped>

.item-title {
  color: rgb(15, 10, 10);  /* 给title加上颜色以便看清是否被渲染 */
  /* border: 1px solid black;   */
}

.item-image {
  /* 定义image的宽和高 */
  width: 800px;  /* 你可以修改为你想要的像素值或者百分比 */
  height: 700px;  /* 你可以修改为你想要的像素值或者百分比 */
}

#hot-recommend {
  padding: 20px;
}
.recommend-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
}

.el-carousel, .el-carousel-item {
  height: 800px; /* or try a fixed height like 400px */
}

#hot-recommend .el-carousel .el-carousel__item.is-active {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
</style>