<template>
  <div class="play-song" v-show="playList.length>0">
    <div class="normal-play" v-show="fullscreen">
      <i class="goback" @click="closeFullscreen"></i>
      <div class="play-tit">{{singInfo.name}}</div>
    </div>
    <div class="mini-play">
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'playList',
        'fullscreen',
        'singInfo'
      ])
    },
    mounted () {
      console.log(this.playList)
    },
    methods: {
      closeFullscreen () {
        this.setFullscreen(false)
      },
      openFullscreen () {
        this.setFullscreen(true)
      },
      ...mapMutations({
        setFullscreen: 'SET_FULLSCREEN'
      })
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
    background: rgba(0, 0, 0, 0.4)
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
      
  .mini-play
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 119
    height: 60px
    background: rgba(157, 145, 133, 0.4)
</style>