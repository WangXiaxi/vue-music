<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div> <!-- scroll inner -->
        <div class="swiper-inner">
          <swiper v-if="ifLoadSiwper" :options="swiperOption" >  
            <!-- 这部分放你要渲染的那些内容 -->  
            <swiper-slide v-for="item in recommends">
              <a>
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </swiper-slide>  
            <!-- 这是轮播的小圆点 -->  
            <div class="swiper-pagination" slot="pagination"></div>  
          </swiper>  
        </div>
        <div class="disclist-tit">
          推荐歌单
        </div>
        <div class="discList">
          <li v-for="item in discList">
            <div class="le">
              <img @load="loadImage2" :src="item.imgurl">
            </div>
            <div class="ri">
              <h3>{{item.creator.name}}</h3>
              <p class="des">{{item.dissname}}</p>
            </div>
          </li>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
            this.ifLoadSiwper = true
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      loadImage2 () {
        this.$refs.scroll.refresh()
      }

    },
    components: {
      swiper,
      swiperSlide,
      Scroll
    },
    data () {
      return {
        recommends: [],
        discList: [],
        swiperOption: {
        // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          loop: true,
          speed: 600,
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
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      width: 100%
      height: 100%
      overflow: hidden
      .disclist-tit
        text-align: center
        line-height: 44px
        
</style>
