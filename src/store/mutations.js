import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_SINGINFO] (state, singInfo) {
    state.singInfo = singInfo
  },
  [types.SET_CURRENTINDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_PLAYLIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_FULLSCREEN] (state, flag) {
    state.fullscreen = flag
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_FIRSTENTER] (state, flag) {
    state.firstEnter = flag
  }
}

export default matutaions
