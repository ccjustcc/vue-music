<template>
  <div id="app">
    <v-mheader></v-mheader>
    <v-tab></v-tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script>
import VMheader from 'components/m-header/m-header';
import VTab from 'components/tab/tab';
import VPlayer from 'components/player/player'
export default {
  name: 'app',
  components:{VMheader,VTab,VPlayer}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
