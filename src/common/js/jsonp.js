import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  //拼接url
   url += (url.indexOf('?')<0?'?':'&')+param(data);
   return new Promise((resole,reject)=>{
      originJsonp(url,option,(err,data)=>{
         if(!err){
           resole(data)
         }else{
           reject(err)
         }
      })
   })
}

function param(data){//拼接参数
  let url = ''
  for(var k in data){
     let value = data[k] !==undefined?data[k] : ''
     url += `&${k}=${encodeURIComponent(value)}`
  }
  return url?url.substring(1):''//去除第一个&
}