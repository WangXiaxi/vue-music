<template>
  <div class="play-song" v-show="playList.length>0">
    <div class="normal-play" v-show="fullscreen" >
      <div class="blurBg" :style="normalPlayStyle"><div class="black"></div></div>
      <i class="goback" @click="closeFullscreen"></i>
      <div class="play-tit">{{singInfo.name}}</div>
      <div class="author">{{singInfo.singer}}</div>
      <div class="middle-part">
        <div class="rotate-part">
          <div class="rotate-img"></div>
          <div class="rotate-lyrics"></div>
        </div>
        <div class="lyrics">
        </div>

        <div class="control">
          <div class="icon-list"></div>
          <div class="icon-play"></div>
        </div>
      </div>
    </div>
    <div class="mini-play">
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    computed: {
      normalPlayStyle () {
        return `background-image:url(${this.singInfo.image})`
      },
      ...mapGetters([
        'playList',
        'fullscreen',
        'singInfo'
      ])
    },
    mounted () {
    },
    methods: {
      _getLyric () {
        this.singInfo.getLyric().then((lyric) => {
          if (this.singInfo.lyric !== lyric) {
            return
          }
          this.currentLyric = lyric
        }).catch(() => {
          this.currentLyric = null
        })
      },
      closeFullscreen () {
        this.setFullscreen(false)
      },
      openFullscreen () {
        this.setFullscreen(true)
      },
      ...mapMutations({
        setFullscreen: 'SET_FULLSCREEN'
      })
    },
    watch: {
      singInfo (newSong) {
        console.log(newSong)
        this._getLyric()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .normal-play
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 120
    
    .blurBg
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: -1
      background: 50% 50% no-repeat
      background-size: auto 100%
      -webkit-filter: blur(15px)
      -webkit-transform: scale(1.15)
      .black
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, .6)
    .goback
      display: block
      width: 40px
      height: 40px
      position: absolute
      top: 0
      left: 0
      z-index: 100
      background: 50% 50% no-repeat
      bg-image('goback')
      background-size: 10px
      transform: rotate(-90deg)
    .play-tit
      height: 40px
      font-size: $font-size-medium-x
      line-height: 40px
      text-align: center
      padding-left: 40px
      padding-right: 40px
      no-wrap()
    .author
      height: 30px
      font-size: $font-size-medium
      line-height: 30px
      color: $color-text-ll
      text-align: center
      no-wrap()
    .middle-part
      position: absolute
      left: 10px
      top: 70px
      bottom: 80px
      right: 10px
      background: rgba(255, 255, 255, .75)
  .mini-play
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 110
    height: 60px
    background: rgba(157, 145, 133, 0.4)
</style>