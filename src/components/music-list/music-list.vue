<template>
    <div class="music-list">
      <div class="go-back">
        <div class="tit">{{title}}</div>
        <div class="back" @click="goBack"></div>
      </div>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-black" ref="bgBlack"></div>
      <scroll :data="songs"
              :listen-scroll="listenScroll" 
              :probe-type="probeType" class="music-content" @scroll="scroll" ref="scroll">
        <div class="list">
          <div v-if="songs.length>0" class="singer-item" v-for="(item,index) in songs" @click="goOpenMusic(item)">
            <div class="num">{{index + 1}}</div>
            <div class="tit-info">
              {{item.name}}
              <p class="small">{{item.album}}</p>
            </div>
            
          </div>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions} from 'vuex'
  import {prefixStyle} from 'common/js/dom'

  const TITHEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scrollY: 0,
        listenScroll: true,
        probeType: 3
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      },
      ...mapGetters([
        'playList'
      ])
    },
    methods: {
      handlePlaylist (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.scroll.$el.style['bottom'] = bottom
        this.$refs.scroll.refresh()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      goBack () {
        this.$router.back()
      },
      goOpenMusic (item) {
        let ifExist = 0
        this.playList.forEach((itemIn, index) => {
          if (itemIn['id'] === item['id']) {
            ifExist = 1
          }
        })
        if (!ifExist) {
          // 方法 添加歌到列表的方法
          this.addSong(item)
        }
      },
      ...mapActions([
        'addSong'
      ])

    },
    mounted () {
      this.handlePlaylist(this.playList)
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.scroll.$el.style.top = `${this.imageHeight}px`
      this.maxTop = -(this.imageHeight - TITHEIGHT)
    },
    created () {
    },
    components: {
      Scroll
    },
    watch: {
      scrollY (Y) {
        let percent = 1
        let top = '70%'
        let zIndex = 0
        let moveY = Y
        let blur = 0
        if (Y > 0) { // 伸缩
          percent = 1 + Math.abs(Y / this.imageHeight)
        } else {
          blur = Math.min(20 * Math.abs(Y / this.imageHeight), 20)
        }
        if (Y < this.maxTop) { // 判断当前背景是否需要移动
          moveY = this.top
          zIndex = 99
          top = TITHEIGHT + 'px'
        }
        this.$refs.bgImage.style.paddingTop = top
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${percent})`
        this.$refs.bgBlack.style[transform] = `translateY(${moveY}px)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      },
      playList (playList) { // 检测是否有播放器
        this.handlePlaylist(playList)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .go-back
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 40px
    z-index: 100
    .tit
      width: 100%
      height: 100%
      position: relative
      display: flex
      justify-content: center
      align-items: center
    .back
      position: absolute
      top: 0
      left: 0
      width: 40px
      height: 40px
      z-index: 1
      background: 50% 50% no-repeat
      bg-image('goback')
      background-size: 10px
      opacity: 0.8
  .bg-image
    width: 100%
    padding-top: 70%
    background-size: 100% auto
    position: relative
    transform-origin:50% 0
    .filter
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .3)
  .music-content
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: transparent
    z-index: 2
    .list
      color: $color-dialog-background
      .singer-item
        display: -webkit-box
        .num
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-box-pack: center
          -webkit-box-align: center
          width: 45px
        .tit-info
          -webkit-box-flex: 1
          padding: 6px 8px
          line-height: $font-size-large-x
          .small
            font-size: $font-size-small
            color: $color-background-999
        &:first-child,&:nth-child(2),&:nth-child(3)
          .num
            color: red
  .bg-black
    width: 100%
    height: 100%
    background: $color-background
    position: relative
    z-index: 1
</style>