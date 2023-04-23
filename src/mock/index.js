import Mock from 'mockjs'
import videosList from './data/videosList'
import videoDetailList from './data/videoDetailList'

// mock的配置
Mock.setup({
  // 随机延时50-1000毫秒
  timeout: '50-1000'
})

Mock.mock(/\/deletevideosList/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videosList.find(item =>{
        if(item.id==id){
          item.exist=1
        }
      })
    }
  })
})

Mock.mock(/\/videosList/, 'get', ({url}) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  let pagenum = queryObj.get('pagenum')
  const pagesize = queryObj.get('pagesize')
  const username = queryObj.get('username')
  const userline = queryObj.get('userline')
  const industry = queryObj.get('industry')
  const createTime = queryObj.get('createTime')
  const endTime = queryObj.get('endTime')
  return Mock.mock({
    code: 0,
    result: function () {
      let pagecount=Math.ceil(videosList.length/pagesize)
      if(pagenum<1) pagenum = 1;
        if(pagenum >pagecount) pagenum = pagecount;
        let offset = pagesize * (pagenum- 1 );
        let limit;
        if(pagenum < pagecount)
        {
            limit = pagesize;
        }else{
            limit = videosList.length % (pagesize-0);
        }
        if(limit==0) limit=pagesize
        let data
        if(username!=""||userline!=""||industry!=""||createTime!=""||endTime!=""){
          data=videosList.filter(i=>i.name.includes(username)).filter(i=>i.profession.includes(userline))
          .filter(i=>i.o1_name.includes(industry)).filter(i=>i.createdTime.includes(createTime))
          .filter(i=>i.exist==0)
          const a=data.length
          data=data.slice(offset ,offset+(limit-0));
          return {
            resultData:data,
            pagecount:a
          }
        }else{
          data= videosList.filter(i=>i.exist==0)
          const b=data.length
          data=data.slice(offset ,offset+(limit-0))
          return {
            resultData:data,
            pagecount:b
          }
        }
      
        
        // if(data.length==0){
        //   return {resultData:[],pagecount:0};
        // }
        // else {
        //   return {
        //     resultData:data,
        //     pagecount:pagecount
        //   }
        // }
        
    }
  })
})


Mock.mock(/\/reviewDetail1/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    c:2,
    result: function () {
      return videosList.find(item => item.id == id)
    }
  })
})
Mock.mock(/\/reviewDetail2/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(item => item.id === id)
    }
  })
})

Mock.mock(/\/successreviewDetail/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id1 = queryObj.get('id1')
  const id2 = queryObj.get('id2')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(i =>{
        if(i.id==id1){
          i.children.find(item =>{
            if(item.id==id2){
              item.status=2
            }
          })
        }
      })
    }
  })
})

Mock.mock(/\/reject/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(i =>{
        if(i.id==id){
          i.children.forEach(item=>{
            item.status=1
          })
        }
      })
    }
  })
})
Mock.mock(/\/successReviewDetailMore/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  let userlist = queryObj.get('userlist')
  userlist=JSON.parse(userlist).filter(i=>i.select==true)
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(i =>{
        if(i.id==id){
          i.children.find(item =>{
            for(let i=0;i<userlist.length;i++){
            
                if(item.id==userlist[i].id){
                  item.status=3
                }
              
            }
          })
        }
      })
    }
  })
})
Mock.mock(/\/deletereviewDetailMore/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  let userlist = queryObj.get('userlist')
  userlist=JSON.parse(userlist).filter(i=>i.select==true)
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(i =>{
        if(i.id==id){
          i.children.find(item =>{
            for(let i=0;i<userlist.length;i++){
              if(userlist[i].select){
                if(item.id==userlist[i].id){
                  item.status=1
                }
              }
            }
          })
        }
      })
    }
  })
})
Mock.mock(/\/deletereviewDetail/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id1 = queryObj.get('id1')
  const id2 = queryObj.get('id2')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(i =>{
        if(i.id==id1){
          i.children.find(item =>{
            if(item.id==id2){
              item.status=1
            }
          })
        }
      })
    }
  })
})

Mock.mock(/\/videoDetail/, 'get', ({ url }) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(item => item.id === id)
    }
  })
})

