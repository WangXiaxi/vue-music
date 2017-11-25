<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
      <keep-alive>
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    opacity: 0
</style>
