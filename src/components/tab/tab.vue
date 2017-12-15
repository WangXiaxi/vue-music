<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/reacommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    background: $color-text
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      position: relative
      .tab-link
        padding-bottom: 5px
        color: $color-dialog-background
        
      &.router-link-active
        &::after
          content: ' '
          position: absolute
          bottom: 0
          width: 100%
          height: 2px
          background: $color-theme
          left: 0
        .tab-link
          color: $color-theme
</style>