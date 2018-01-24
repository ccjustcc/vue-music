<template>
  <div class="search">
    <v-search-box ref="searchbox" 
    @query="onQueryChange"></v-search-box>
    <div class="shortcut-wrapper" v-show="!query">
       <div class="shortcut">
       <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
             <li v-for="item in hotKey " class="item" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
             </li>
          </ul>
       </div>
       </div>
    </div>
    <div class="search-result" v-show="query">
      <v-suggest :query="query" :listScroll="blurInput" @select="saveSearch"></v-suggest>
    </div>
   <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span  class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
        <v-search-list  :searches="searchHistory" @select="addQuery" @delete="deleteOne"></v-search-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script >
  import VSearchBox from 'base/search-box/search-box'
  import VSearchList from 'base/search-list/search-list'
  // import Scroll from 'base/scroll/scroll'
  // import Confirm from 'base/confirm/confirm'
  import VSuggest from 'components/suggest/suggest'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  // import {playlistMixin, searchMixin} from 'common/js/mixin'
  import {mapActions,mapGetters} from 'vuex'

  export default {
    // mixins: [playlistMixin, searchMixin],
    data() {
      return {
        hotKey: [],
        query:''
      }
    },
    computed: {
      shortcut() {
        // return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    created() {
      this._getHotKey()
    },
    methods: {
        addQuery(query){
          this.$refs.searchbox.setQuery(query)
        },
        onQueryChange(query){
          this.query = query
        },
    //   handlePlaylist(playlist) {
    //     const bottom = playlist.length > 0 ? '60px' : ''

    //     this.$refs.searchResult.style.bottom = bottom
    //     this.$refs.suggest.refresh()

    //     this.$refs.shortcutWrapper.style.bottom = bottom
    //     this.$refs.shortcut.refresh()
    //   },
    //   showConfirm() {
    //     this.$refs.confirm.show()
    //   },
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      deleteOne(item){
          console.log('dd')
          this.deleteSearchHistory(item);
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      blurInput(){
        this.$refs.searchbox.blur();
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory'
      ])
    },
    // watch: {
    //   query(newQuery) {
    //     if (!newQuery) {
    //       setTimeout(() => {
    //         this.$refs.shortcut.refresh()
    //       }, 20)
    //     }
    //   }
    // },
    components: {
      VSearchBox,VSuggest,VSearchList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>