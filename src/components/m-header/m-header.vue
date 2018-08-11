<template>
  <div class="m-header">
    <div class="icon">
      
    </div>
    <h1 class="text">
      下载APP
    </h1>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-text
    font-size: 0
    background: #31c27c
    .icon
      display: block
      float: left
      margin-top: 9px
      width: 90px
      height: 25px
      margin-left: 10px
      background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo.png?max_age=19830212&d=20151105145423)
      background-size: 100%
      background-repeat: no-repeat
    .text
      display: block
      vertical-align: top
      float: right
      line-height: 28px
      background: #149c5a
      padding: 0 12px
      margin-right: 10px
      margin-top: 8px
      border-radius: 14px
      font-size: $font-size-medium
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>