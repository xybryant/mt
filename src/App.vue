<template>
  <div id="app">
   <app-header :poiInfo="poiInfo"/>
   <app-nav :commentNum="commentNum"/>
   <!-- <app-nav :commentNum="commentNum" :ratings="ratings"/> -->
   <div class="content">
  <keep-alive>
   <router-view></router-view>
  </keep-alive>
   </div>
   <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import Header from './components/Header'
  import Nav from './components/Nav'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-nav': Nav
  },
  data () {
    return {
      poiInfo: {},
      commentNum: 0
      // ratings: {}
    }
  },
  created () {
    fetch('/api/goods')
      .then(res => {
        return res.json()
      }).then(data => {
        //console.log(data)
        if(data.code === 0){
          this.poiInfo = data.data.poi_info
          //console.log(this.poiInfo.head_pic_url)
        }
      })
    fetch('/api/ratings')
      .then(res => {
        return res.json()
      }).then(data => {
        if(data.code === 0){
          this.commentNum = data.data.comment_num
          // this.ratings = data.data
        }
      })
  }
}
</script>

<style>
  #app {
    
  }
  [v-cloak] {
    display: none;
  }
  .content {
    position: absolute;
    top: 191px;
    /*bottom: 50px;*/
    bottom: 0;
    width: 100%;
    /*z-index: -1;*/
  }
</style>
