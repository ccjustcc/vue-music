import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from '@/store'
Vue.config.productionTip = false;
import 'common/stylus/index.styl';

import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick';

fastclick.attach(document.body);
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
