<template>
  <transition name="slide">
    <music-list class="singer-detail" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'
  import {getSingerDetail} from 'api/singer'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created () {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail () {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs (list) {
        console.log(list)
        let ret = []
        list.forEach((item) => {
          let {musicData} = item  // 引用
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    data () {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>