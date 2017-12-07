<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <play-song></play-song>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import playSong from 'components/play-song/play-song'

  export default {
    components: {
      MHeader,
      Tab,
      playSong
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    opacity: 0
</style>
