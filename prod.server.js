var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = 80;

var app = express()

app.get('/api/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getcdlist', (req, res) => {
  
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    
    if (typeof ret === 'string') {
      //把jsonp变为json对象
      var reg = /^\w+\(({[^]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
       
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      //把jsonp变为json对象
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getvkey', function (req, res) {
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  var commonParams ={
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,//cid是固定的，而guid是靠算法算的，可变
    uin:0,
    guid:8757676107
  }
  var params = Object.assign({}, commonParams, req.query)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: params
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      //把jsonp变为json对象
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})