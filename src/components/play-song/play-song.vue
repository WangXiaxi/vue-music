<template>
  <div class="play-song" :style="ifShowStyle">
    
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ifShowStyle () {
        console.log(111)
        return `display:${this.ifShowPlay}`
      },
      ...mapGetters([
        'ifShowPlay'
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
    height: 80px
    // background: red
    z-index: 100
    display: none
</style>