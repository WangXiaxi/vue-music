<template>
  <scroll class="singer-content" :listen-scroll="listenScroll" :probe-type="probeType" @scroll='scroll' ref="scroll">
    <div> <!-- scroll inner -->
      <div class="list">
        <dl v-for="itemBig in data" class="singer-inner">
          <dt>{{itemBig.name}}</dt>
          <dd v-for="item in itemBig.items">{{item.name}}</dd>
        </dl>
      </div>

      <div class="fix-list">
        <div v-for="item in data">{{item.name.substring(0,1)}}</div>
      </div>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    created () {

    },
    data () {
      return {
        scrollY: 0,
        listenScroll: true,
        probeType: 3
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      data () {
        if (this.data.length > 0) {
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .singer-content
    width: 100%
    height: 100%
    overflow: hidden
  .list
    dl
      dt
        color: $color-highlight-background
      dd
        color: $color-background-999
  .fix-list
    position: fix
    width: 
    
</style>

