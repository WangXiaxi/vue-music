<template>
 <div class="recommend" ref="recommend">
  <div class="swiper-inner">
    <swiper v-if="ifLoadSiwper" :options="swiperOption">  
        <!-- 这部分放你要渲染的那些内容 -->  
        <swiper-slide v-for="item in recommends">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </swiper-slide>  
        <!-- 这是轮播的小圆点 -->  
        <div class="swiper-pagination" slot="pagination"></div>  
    </swiper>  
    </div>
 </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    created () {
      this._getRecommend()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
            this.ifLoadSiwper = true
          }
        })
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        recommends: [],
        swiperOption: {
        // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          loop: true,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          autoplay: 3000,
          autoHeight: true,
          autoplayDisableOnInteraction: false
        },
        ifLoadSiwper: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper-inner
    .swiper-slide
      a
        display: block
        img
          display: block
          width: 100%
</style>
