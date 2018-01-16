<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    data(){
      return {
        dots:[],
        currentPageIndex:0
        
      }
    },
    props:{
      loop:{
        type: Boolean,
        default: true
      },
      autoPlay:{
        type: Boolean,
        default: true
      },
      interval:{
        type: Number,
        default: 4000
      }
    },
    mounted(){
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots()
        this._initSlider();
        if(this.autoPlay){
          this._autoPlay()
        }
      }, 20);
      window.addEventListener('resize',()=>{
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
       this.$nextTick(()=>{
         
       })
    },
    methods:{
      _setSliderWidth(isResize){
        
          this.children = this.$refs.sliderGroup.children;
          let width = 0 ;
          let sliderWidth = this.$refs.slider.clientWidth
          for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth;
          }
        if (this.loop && !isResize) {
            width += 2 * sliderWidth
          }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider(){
          this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click:true
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1//不一样
          }
          // console.log(pageInkdex);
          this.currentPageIndex = pageIndex
          console.log(this.currentPageIndex);
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._autoPlay()
          }
        })

      },
      _initDots(){
        this.dots = new Array(this.children.length)
      },
      _autoPlay(){
        let pageIndex = this.currentPageIndex;
        if(this.autoPlay){
          pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


//recommend.vue

<template>
  <div class="recommend" ref="recommend">
    <div class="slider-wrapper" v-if="this.recommends.length">
      <v-slider >
          <div v-for="item in recommends" >
             <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="pic">
             </a>
          </div>
      </v-slider>
    </div>
    <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
          </ul>
      </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
 import {getRecommend} from 'api/recommend'
 import VSlider from 'base/slider/slider'

 let ERR_OK = 0;
  export default {
    name:'recommend',
    data(){
      return{
        recommends:{}
      }
    },
    methods:{
      _getRecommend(){
         getRecommend().then((res)=>{
           if(res.code ==ERR_OK){
              let slider = res.data.slider;
              this.recommends =  slider ;
           }
         });
      }
    },
    components:{
        VSlider
    },
    created(){
        this._getRecommend();
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">