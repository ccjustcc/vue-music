<template>
  <div class="search">
    <div class="search-box-wrapper">
    <v-search-box ref="searchbox" 
    @query="onQueryChange"></v-search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
       <v-scroll class="shortcut" ref="shortcut" :data="shortcut" >
        <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li v-for="item in hotKey " class="item" @click="addQuery(item.k)">
                    <span>{{item.k}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span  class="clear" @click="showConform">
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <v-search-list  :searches="searchHistory" @select="addQuery" @delete="deleteOne"></v-search-list>
            </div>
        </div>
       </v-scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <v-suggest :query="query" :listScroll="blurInput" @select="saveSearch" ref="suggest"></v-suggest>
    </div>
    <v-confirm ref="confirm"
    text="是否清空所有搜索历史"
    confirmBtnText="清空"
    @confirm="clearSearchHistory"
    ></v-confirm>
    <router-view></router-view>
  </div>
</template>

<script >
  import VSearchBox from 'base/search-box/search-box'
  import VSearchList from 'base/search-list/search-list'
  import VScroll from 'base/scroll/scroll'
  import VConfirm from 'base/confirm/confirm'
  import VSuggest from 'components/suggest/suggest'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {playlistMixin, searchMixin} from 'common/js/mixin'
  import {mapActions,mapGetters} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        hotKey: [],
        query:''
      }
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
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
        showConform(){
          this.$refs.confirm.show()
          // this.clearSearchHistory()
        },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      deleteOne(item){
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
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    //不明白为什么这里不能滑动
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      VSearchBox,VSuggest,VSearchList,VConfirm,VScroll
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