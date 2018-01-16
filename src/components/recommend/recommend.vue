<template>
  <div class="recommend" ref="recommend">
    <v-scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <!-- 上面得轮播广告 -->
        <div class="slider-wrapper" v-if="this.recommends.length">
          <v-slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage" alt="pic" >
              </a>
            </div>
          </v-slider>
        </div>
        <!-- 上面得轮播广告 -->
        <!-- 下面的歌单 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 下面的歌单 -->
      </div>
       <div class="loading-container" v-show="!discList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getRecommend,
    getDiscList
  } from 'api/recommend'
  import VSlider from 'base/slider/slider'
  import VScroll from 'base/scroll/scroll'
  import VLoading from 'base/loading/loading'

  let ERR_OK = 0;
  export default {
    name: 'recommend',
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            let slider = res.data.slider;
            this.recommends = slider;
          }
        });
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImage(){
         if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      }
    },
    components: {
      VSlider,
      VScroll,
      VLoading
    },
    created() {
       this._getRecommend();
       this._getDiscList();
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
