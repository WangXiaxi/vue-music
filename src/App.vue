<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
      <keep-alive>
        <router-view class="animated fadeIn"></router-view>
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
  .animated
    animation-duration:1s
    animation-fill-mode:both
  .fadeIn
    animation-name:fadeIn
  @keyframes fadeIn
    0%
      opacity: 0
    to
      opacity: 1
</style>
