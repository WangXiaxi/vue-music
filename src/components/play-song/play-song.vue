<template>
  <div class="play-song" :style="ifShowStyle">
    
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ifShowStyle () {
        let ifShow = this.playList.length > 0 ? 'block' : 'none'
        return `display: ${ifShow}`
      },
      ...mapGetters([
        'playList'
      ])
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .play-song
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: 60px
    background: red
    z-index: 100
    display: none
</style>