import {getLyric,getMusicUrl} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image,getUrl,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image;
    if(getUrl){
      this.getUrl= getUrl
      this.getUrl()
    }
    if(url){
      this.url = url
    }
  }
  
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric);
    }
    //更加有逻辑
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
  // getLyric() {
  //   if (this.lyric) {
  //     return Promise.resolve(this.lyric)
  //   }

  //   return new Promise((resolve, reject) => {
  //     getLyric(this.mid).then((res) => {
  //       if (res.retcode === ERR_OK) {
  //         this.lyric = Base64.decode(res.lyric)
  //         resolve(this.lyric)
  //       } else {
  //         reject('no lyric')
  //       }
  //     })
  //   })
  // }
}
let durations = [274,219,259]
let num = Math.floor(Math.random()*3);
//这个函数也变得没有意义了
function _getGuid(){
  let t = (new Date).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}
function getUrl(){
   let vkey = '';
   let guid = 8757676107 ;//这个要和getvkey中的guid一致
   let filename = `C400${this.mid}.m4a`;
   getMusicUrl(this.mid).then((res)=>{
    if(res.code === ERR_OK){
      vkey = res.data.items[0].vkey;
      let url = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`;
      this.url=url;
    }else{
      console.log('wrong')
    }
   })
}
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    getUrl:getUrl,
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  //有点不明白 再第六课第6课时
  return ret.join('/')
}

