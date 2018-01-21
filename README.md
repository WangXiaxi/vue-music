# vue-music

> MUSIC

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## summary

``` bash
# 1、推荐列表如需编写 可以写一个共用music-list的组建，省略。

# 2、播放列表只需把播放时，歌添加到vuex playList, 省略。

# 3、vuex重点，用于页面间交互。

# 4、better-scroll大致方法都已经用到，起到了学习作用。

# 5、此项目数据抓取部分是参考原学习视频的方法，其余功能都是由本人独自研究并且开发。

# 6、vue全家桶安装可参照原视频。
```
## question

``` bash
# 1、qq音乐audio播放加入了验证参数vkey与guid才能播放, 已经偏离前端我并未做研究，我项目中将这两个参数分离出放在／src/api/config.js文件下，只需到qq音乐audio链接下拷贝就能正常播放。

# 2、audio在ios移动端下无法自动播放问题，解决方法较多，我采取到是首次播放需手动点击播放按钮（比较符合逻辑）。
```
