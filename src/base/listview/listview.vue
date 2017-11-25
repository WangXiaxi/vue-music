<template>
  <scroll class="singer-content" :listen-scroll="listenScroll" :probe-type="probeType" @scroll='scroll' ref="scroll">
    <div class="list">
      <dl v-for="itemBig in data" class="singer-inner" ref="listGroup">
        <dt>{{itemBig.name}}</dt>
        <dd v-for="item in itemBig.items" @click="selectItem(item)">{{item.name}}</dd>
      </dl>
    </div>

    <div class="fix-list" @touchmove.stop.prevent="_moveHeight" @touchstart.stop.prevent="_startHeight">
      <div v-for="(item, index) in data" @touchstart="_clickGoHeight(index)" :data-index="index" :class="{'cur':index === curIndex}" ref="listTrigger">{{item.name.substring(0,1)}}</div>
    </div>

    <div class="fix-tit" ref="fixTit">
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  const ANCHOR_HEIGHT = 16
  const TIT_HEIGHT = 16
  console.log(TIT_HEIGHT)
  export default {
    components: {
      Scroll
    },
    created () {
      this.touch = {}
    },
    data () {
      return {
        scrollY: 0,
        listenScroll: true,
        probeType: 3, // 传递到子集scroll
        listHeight: [],
        curIndex: 0
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
      },
      _computListHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        list.forEach((cur, index) => {
          height += cur.offsetHeight
          this.listHeight.push(height)
        })
      },
      _clickGoHeight (index) {
        this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 300)
      },
      _startHeight (e) {
        this.touch.Y1 = e.touches[0].pageY
        this.touch.anchorIndex = Number(e.target.getAttribute('data-index'))
      },
      _moveHeight (e) {
        this.touch.Y2 = e.touches[0].pageY
        let moveNum = (this.touch.Y2 - this.touch.Y1) / ANCHOR_HEIGHT | 0  // 相位 舍弃小数点 加 0
        let index = this.touch.anchorIndex + moveNum
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.curIndex = index
        this._clickGoHeight(index)
      },
      _addTit (index) {
        this.$refs.fixTit.innerText = this.data[index].name
      },
      selectItem (item) {
        this.$emit('select', item)
      }
    },
    watch: {
      data () {
        if (this.data.length > 0) {
          setTimeout(() => {
            this.$refs.scroll.refresh()
            this._computListHeight()
          }, 20)
        }
      },
      scrollY (Y) { // 括号里是新值
        // console.log(-Y)
        for (let i = 0; i < this.listHeight.length - 2; i++) {
          if (-Y + 1 >= this.listHeight[i] && -Y + 1 < this.listHeight[i + 1]) { // 保留一个像素协调
            this.curIndex = i
          }

          if (-Y + 1 >= this.listHeight[i] - TIT_HEIGHT && -Y + 1 < this.listHeight[i]) { // 保留一个像素协调
            this.$refs.fixTit.style.transform = 'translateY(' + (this.listHeight[i] + Y - TIT_HEIGHT) + 'px)'
          } else if ((-Y + 1) >= this.listHeight[i]) {
            this.$refs.fixTit.style.transform = 'translateY(0)'
          }
        }
        if (-Y >= this.listHeight[this.listHeight.length - 1]) {
          this.curIndex = this.listHeight.length - 1
        }
        if (-Y < this.listHeight[0]) {
          this.curIndex = 0
        }

        this._addTit(this.curIndex)
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
    position: relative
  .list
    dl
      dt
        color: $color-highlight-background
      dd
        color: $color-background-999
  .fix-list
    position: fixed
    color: $color-text
    right: 0
    top: 50%
    padding:10px 0
    border-radius: 10px
    transform: translateY(-50%)
    font-size: $font-size-small
    line-height: $font-size-medium-x
    background: rgba(0, 0, 0, 0.1)
    div
      padding: 0 2px
      text-align: center
    div.cur
      color: $color-theme
  .fix-tit
    position: absolute
    top: 0
    color: $color-highlight-background
</style>

