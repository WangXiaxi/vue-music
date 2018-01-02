<template>
  <div class="play-song" v-show="playList.length>0">
    <div class="normal-play" v-show="fullscreen" >
      <div class="blurBg" :style="normalPlayStyle"><div class="black"></div></div>
      <i class="goback" @click="closeFullscreen"></i>
      <div class="play-tit">{{singInfo.name}}</div>
      <div class="author">{{singInfo.singer}}</div>
      <div class="middle-part" @touchstart.prevent="middleTouchStart"
                               @touchend.prevent="middleTouchEnd">
        <transition name="slide">
          <div v-if="ifCd" class="rotate-part">
            <div class="rotate-img"></div>
            <div class="rotate-lyrics">
              
            </div>
          </div>
        </transition>
        <transition name="slide">
          <scroll v-if="!ifCd && currentLyric" class="lyrics" ref="lyricList" :data="currentLyric.lines">
            <div class="lyric-wrapper">
              <div>
                <p ref="lyricLine"
                   class="text"
                   v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </transition>
      </div>
      <div class="control">
          <div class="icon-list"></div>
          <div @click.stop="playSong" :class="disCls" class="icon-play"></div>
          <div class="progress-bar-box">
            <div class="progress-bar">
              <div class="progress-bar-inner"></div>
            </div>
            <div class="pub-time cur-time" ref="curTimeText">
              {{format(curTime)}}
            </div>
            <div class="pub-time all-time" ref="allTimeText">
              {{format(singInfo.duration)}}
            </div>
          </div>
        </div>
    </div>
    <div class="mini-play" v-show="!fullscreen">
      
    </div>

    <audio :src="singInfo.url" ref="audio" @error="error" @timeupdate="upTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import {isIos} from 'common/js/dom'

  const ISIOS = isIos()
  export default {
    components: {
      Scroll
    },
    computed: {
      disCls () { // 根据歌曲是否开始 执行 是否添加act
        return this.playing ? 'act' : ''
      },
      normalPlayStyle () {
        return `background-image:url(${this.singInfo.image})`
      },
      ...mapGetters([
        'playList',
        'fullscreen',
        'singInfo',
        'playing'
      ])
    },
    mounted () {
    },
    data () {
      return {
        currentLyric: null,
        curTime: 0,
        ifCd: true, // 判断是否是cd还是歌词
        middleTouch: {} // 记录
      }
    },
    methods: {
      _getLyric () {
        this.singInfo.getLyric().then((lyric) => {
          if (this.singInfo.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric)
          console.log(this.currentLyric)
        }).catch(() => {
          this.currentLyric = null
        })
      },
      middleTouchStart (e) {
        const touch = e.touches[0]
        this.middleTouch.x = touch.pageX
        this.middleTouch.y = touch.pageY
        this.middleTouch.time = (new Date()).valueOf()
      },
      middleTouchEnd (e) {
        const touch = e.changedTouches[0]
        const endX = touch.pageX
        const endY = touch.pageY
        const endTime = (new Date()).valueOf()
        if ((endTime - this.middleTouch.time) < 1000 && Math.abs(endX - this.middleTouch.x) > 100 && Math.abs(endY - this.middleTouch.y) < Math.abs(endX - this.middleTouch.x)) {
          if (endX < this.middleTouch.x) {
            this.ifCd = false
          } else {
            this.ifCd = true
          }
        }
      },
      upTime () { // 歌曲触发
        const audio = this.$refs.audio
        this.curTime = audio.currentTime
      },
      format (time) {  // 转化时间格式
        time = time | 0
        let minute = time / 60 | 0
        let second = time % 60
        if (second < 10) {
          second = '0' + second
        }
        if (minute < 10) {
          minute = '0' + minute
        }
        return `${minute}:${second}`
      },
      error () {
        this.setPlaying(false)
        alert('播放失败')
      },
      closeFullscreen () {
        this.setFullscreen(false)
      },
      openFullscreen () {
        this.setFullscreen(true)
      },
      playSong () {
        if (ISIOS && !this.playing) {
          this.$refs.audio.play()
        }
        this.setPlaying(!this.playing)
      },
      ...mapMutations({
        setFullscreen: 'SET_FULLSCREEN',
        setPlaying: 'SET_PLAYING'
      })
    },
    watch: {
      singInfo (newSong) {
        this._getLyric()
        if (ISIOS) {
          this.setPlaying(!this.playing)
        } else {
          this.$nextTick(() => {
            this.$refs.audio.play()
          })
        }
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    opacity: 0
    transform: translate3d(100%, 0, 0)
    
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
      overflow: hidden
      .lyrics
        width: 100%
        height: 100%
        overflow: hidden
    .control
      position: absolute
      bottom: 0
      left: 0
      z-index: 3
      width: 100%
      height: 80px
      .icon-list
        position: absolute
        top: 0
        left: 10px
        background: url(./sprite_play.png) no-repeat
        background-size: 100% auto
        background-position: 9px -228px
        width: 40px
        height: 40px
      .icon-play
        position: absolute
        right: 10px
        top: 0
        background: url(./sprite_play.png) no-repeat
        background-size: 100% auto
        background-position: 7px 10px
        width: 40px
        height: 40px
        &.act
          background-position: 7px -29px
      .progress-bar-box
        position: absolute
        left: 0
        bottom: 0
        right: 0
        height: 40px
        .pub-time
          width: 55px
          height: 40px
          font-size: $font-size-small
          line-height: 40px
          text-align: center
          position: absolute
          color: $color-text-l
          top: 0
          &.cur-time
            left: 0
          &.all-time
            right: 0
        .progress-bar
          position: absolute
          top: 19px
          left: 55px
          right: 55px
          bottom: 19px
          border-radius: 1px
          background: $color-text-l
        .progress-bar-inner
          width: 100%
          height: 100%
          background: $color-theme
  .mini-play
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 110
    height: 60px
    background: rgba(157, 145, 133, 0.4)
    
</style>