<template>
  <transition name="slide">
    <v-music-list
    :title="title"
    :bgImage="bgImage         "
    ></v-music-list>
  </transition>
</template>

<script>
  import VMusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

  export default {
    name:'disc',
    computed:{
     title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters(['disc'])
    },
    created(){
      this._getSongList();
    },
    methods:{
      _getSongList(){
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
             console.log(res.cdlist.songlist)
            // this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      }
    },
    components: {
      VMusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>