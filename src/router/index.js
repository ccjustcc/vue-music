import Vue from 'vue'
import Router from 'vue-router'
// import Mheader from 'components/m-header/m-header'
import Recommend from 'components/recommend/recommend'
// import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'otherall',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component:Recommend
    },
    // {
    //   path: '/search',
    //   name: 'Search',
    //   component:Search
    // },
    {
      path: '/singer',
      name: 'Singer',
      component:Singer,
      children:[
        {
          path: ':id',
          component:SingerDetail
        }
      ]
    }
  ]
})
