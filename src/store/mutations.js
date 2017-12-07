import * as types from './mutation-type'

const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_SINGINFO] (state, singInfo) {
    state.singInfo = singInfo
  }
}

export default matutaions
