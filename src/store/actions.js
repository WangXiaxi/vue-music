import {findIndex} from 'common/js/util'
import * as types from './mutation-types'

export const addSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let index = findIndex(state.playList, song)
  if (index < 0) {
    playList.push(song)
  }
  commit(types.SET_CURRENTINDEX, playList.length - 1)
  commit(types.SET_SINGINFO, song)
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}
