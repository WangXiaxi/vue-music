import * as types from './mutation-type'

const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_SINGINFO] (state, singInfo) {
    state.singInfo = singInfo
  },
  [types.SET_IFSHOWPLAY] (state, ifShowPlay) {
    state.ifShowPlay = ifShowPlay
  }
}

export default matutaions
