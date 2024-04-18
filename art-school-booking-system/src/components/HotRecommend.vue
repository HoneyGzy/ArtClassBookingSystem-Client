<template>
    <div id="hot-recommend">
      <h2 class="recommend-title">热门推荐</h2>
      <div class="recommend-list">
        <div 
          class="recommend-item" 
          v-for="(item, index) in hotList" 
          :key="index" 
          @click="redirectItem(item.link)"
        >
          <img :src="item.image" :alt="item.title" class="item-image">
          <h3 class="item-title">{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HotRecommendContent',
    data() {
      return {
        hotList: [] 
      }
    },
    methods: {
      redirectItem(link) {
        window.location.href = link;
      }
    }
  }
  </script>
  
  <style scoped>
  #hot-recommend {
    padding: 20px;
  }
  
  .recommend-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2em;
  }
  
  .recommend-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .recommend-item {
    width: 300px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
  }
  
  .recommend-item:hover {
    transform: scale(1.05);
  }
  
  .item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .item-title {
    text-align: center;
    padding: 15px;
  }
  </style>