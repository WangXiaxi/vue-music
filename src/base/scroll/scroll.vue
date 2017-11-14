<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/javascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      },20)
    },
    methods: {
      _initScroll () {
        if(!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          console.log(this.scroll)
          let me = this
          this.scroll.on('scroll', (pos) => {
            console.log(pos.y)
            me.$emit('scroll', pos)
          })
        }
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disenable () {
        this.scroll && this.scroll.disenable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style type="text/css">
  
</style>