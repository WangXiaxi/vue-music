import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

require('swiper/dist/css/swiper.min.css')
Vue.use(VueAwesomeSwiper)

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: 'https://y.gtimg.cn/mediastyle/yqq/img/loading.gif'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
