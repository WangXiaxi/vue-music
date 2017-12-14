import * as types from './mutation-type'

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
  [types.SET_ADD_PLAYLIST] (state, list) {
    state.playList.push(list)
  }
  // [types.SET_DEL_PLAYLIST] (state, ID) {
  //   state.playList = id
  // }
}

export default matutaions
