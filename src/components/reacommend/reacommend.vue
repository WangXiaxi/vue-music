<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :listen-scroll="listenScroll" ref="scroll" :data="discList">
      <div> <!-- scroll inner -->
        <div class="swiper-inner">
          <swiper v-if="ifLoadSiwper" :options="swiperOption" ref="mySwiper">  
            <!-- 这部分放你要渲染的那些内容 -->  
            <swiper-slide v-for="item in recommends">
              <a>
                <img @click="goUrl(item.linkUrl)" @load="loadImage" :src="item.picUrl">
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
          <li @click="selectSongClass(item)" v-for="item in discList">
            <div class="le">
              <img v-lazy="item.imgurl">
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

<script>
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapGetters} from 'vuex'

  export default {
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    methods: {
      selectSongClass (item) {
        console.log(item)
      },
      handlePlaylist (playList) {
        console.log(playList)
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style['bottom'] = bottom
        this.$refs.scroll.refresh()
      },
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
      goUrl (url) {
        window.location.href = url
      }
    },
    components: {
      swiper,
      swiperSlide,
      Scroll
    },
    mounted () {
      this.handlePlaylist(this.playList)
    },
    watch: {
      $route () {
        if (this.$route.path === '/reacommend') {
          this.$refs.mySwiper.swiper.startAutoplay()
        } else {
          this.$refs.mySwiper.swiper.stopAutoplay()
        }
      },
      playList (playList) {
        this.handlePlaylist(playList)
      }
    },
    data () {
      return {
        recommends: [],
        listenScroll: true,
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

<style lang="stylus" rel="stylesheet/stylus">
  .swiper-pagination-bullet-active
    background: #fff
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
        text-align: left
        padding-left: 10px
        padding-top: 4px
        line-height: 44px
        color: $color-highlight-background
      .discList
        position: relative
        &>li
          margin: 0 10px
          display: flex
          display: -webkit-box
          display: -ms-flexbox
          background: $color-text
          margin-bottom: 10px
          .le
            width: 90px
            height: 90px
            img
              width: 100%
              height: 100%
          .ri
            flex: 1
            -webkit-box-flex: 1
            -ms-flex: 1
            padding-left: 10px
            h3
              font-size: $font-size-medium-x
              line-height: 30px
              margin-top: 5px
              color: $color-dialog-background
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .des
              font-size: $font-size-small
              color: $color-background-999
              line-height: 18px
              margin-top: 4px
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              overflow: hidden
</style>
