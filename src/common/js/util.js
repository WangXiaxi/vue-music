// 判断歌单是否存在歌曲
export function findIndex (list, song) {
  let index = list.findIndex(function (item) {
    return item.id === song.id
  })
  return index
}
