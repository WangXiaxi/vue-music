import Vue from 'vue'
import Router from 'vue-router'
import Reacommend from 'components/reacommend/reacommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/reacommend'
  },
  {
    path: '/reacommend',
    component: Reacommend
  },
  {
    path: '/singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  },
  {
    path: '/rank',
    component: Rank
  }
]

export default new Router({
  routes
})
