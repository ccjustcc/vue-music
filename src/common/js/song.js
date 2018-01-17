import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image,getUrl}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    // this.duration = duration
    this.image = image
    this.getUrl= getUrl
    this.getUrl()
    // this.ul = url
  }
  
  getLyric(){
    getLyric(this.mid).then((res)=>{
      if(res.retcode === ERR_OK){
        this.lyric = res.lyric;
        console.log(this.lyric)
      }
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
function getUrl(){
   this.num = Math.floor(Math.random()*3);
   this.url = `../../../static/music/test${this.num}.mp3`;
   this.duration = durations[this.num]
}
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    // duration: musicData.interval,
    // duration:duration[num],
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url:getUrl(),
    getUrl:getUrl
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

