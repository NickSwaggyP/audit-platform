<template>
  <div>
    <!-- 卡片试图区域 -->
      <h1>杨政恒审核平台-审核页</h1>

 <el-card >
     <!-- 搜索与添加区域 -->
        <!--查询表单-->
    <el-form :inline="true"
             class="demo-form-inline"
             :model="queryInfo">
      <el-form-item label="用户名">
        <el-input v-model="queryInfo.username"
                  placeholder="用户名"
                  style="width: 100%"
                  disabled/>
      </el-form-item>
       <el-form-item label="用户id">
        <el-input v-model="queryInfo.userline"
                  placeholder="产品线" disabled
                   />
      </el-form-item>
       <el-form-item label="公司网站">
        <el-input v-model="queryInfo.website"
                  placeholder="产品线" disabled
                   />
      </el-form-item> 
           <el-form-item label="资质">
        <el-input v-model="queryInfo.money"
                  placeholder="产品线" disabled
                   />
      </el-form-item>
       <el-form-item label="一级行业">
        <el-input v-model="queryInfo.o1_name"
                  placeholder="产品线" disabled
                   />
      </el-form-item>
       <el-form-item label="二级行业">
        <el-input v-model="queryInfo.o2_name"
                  placeholder="产品线" disabled
                   />
      </el-form-item>
       <el-form-item label="用户类型">
        <el-input v-model="queryInfo.type"
                  placeholder="产品线" disabled
                   />
      </el-form-item>
       <el-form-item label="批注">
        <el-input v-model="queryInfo.comment"
                  placeholder="产品线" disabled
                  style="width: 200%"  />
      </el-form-item>
       <br>
        <el-checkbox v-model="select" @change="changeAllState" style="margin-right:20px">全选</el-checkbox>
       <el-button type="primary"
                 icon="el-icon-search"
                 @click="toQuery">通过所选</el-button>
      <el-button type="default" @click="resetData">拒绝所选</el-button>
      <el-button type="default" @click="reset">拒绝账户</el-button>
    </el-form>

        <!-- 用户列表区域 -->
        <!-- border为边框线,stripe为滑动后会变化颜色 -->
        <el-table :data="userlist" border stripe style="margin-top:30px"> 
            <el-table-column label="选择" width="50px">
                <template slot-scope="scope">
                <el-checkbox @change="changeState(scope.row.select)" v-model="scope.row.select"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="link"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
            <el-table-column label="图片" prop="o1_name">
                <template slot-scope="scope">
                       <img style="width:200px" :src="scope.row.imgSrc" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="success" icon="el-icon-check" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                         <el-button type="danger" icon="el-icon-close"  size="mini" @click="removeUserById(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

     </el-card>

  </div>
</template>

<script>
export default {
 name:'UserPage',
 data(){
    return{
        url:'',
        select:false,
      //获取用户列表的参数对象
      queryInfo:{
          //搜索关键字
          username:'',
          userline:'',
          industry:'',
          createTime:'',
          endTime:'',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 10
      },
      userlist:[],
      checkedCount:0
     }
 },
 computed:{
			isFullCheck(){
				return this.userlist.every(x => x.select)
			}
		},
    watch:{
      isFullCheck(newVal){
          this.select=newVal
      }
    },
 methods:{
    //  changeState(e){
    //      if(e==true){
    //          this.checkedCount++;
    //      }
    //  },
     changeAllState(){
        //  this.checkedCount=0
       this.userlist.forEach(i=>i.select=this.select)  
     },
     async reset () {
         await this.$http({
          url:'/reject',
          method:'get',
          params:{id:window.sessionStorage.getItem("id")
          }
      })
    this.getUserList()
    // this.checkedCount=0
     this.select=false
    }, 
    async toQuery () {
       
         await this.$http({
          url:'/successReviewDetailMore',
          method:'get',
          params:{id:window.sessionStorage.getItem("id"),userlist:JSON.stringify(this.userlist)
          }
      })
    this.getUserList()
    // this.checkedCount=0
     this.select=false
    }, 
    async resetData () {
        await this.$http({
          url:'/deletereviewDetailMore',
          method:'get',
          params:{id:window.sessionStorage.getItem("id"),userlist:JSON.stringify(this.userlist)
          }
      })
    this.getUserList()
    // this.checkedCount=0
     this.select=false
    },
     //获取用户列表
   async getUserList(){
      const {data:res1} = await this.$http({
          url:'/reviewDetail1',
          method:'get',
          params:{id:this.url
          }
      })
      const {data:res2} = await this.$http({
          url:'/reviewDetail2',
          method:'get',
          params:{id:this.url
          }
      })
    this.queryInfo.username=res1.result.name
    this.queryInfo.userline=res1.result.profession
    this.queryInfo.o1_name=res1.result.o1_name
    this.queryInfo.o2_name=res1.result.o2_name
    this.queryInfo.type=res2.result.type
    this.queryInfo.comment=res2.result.comment
    this.queryInfo.money=res2.result.money
    this.queryInfo.website="https://www.baidu.com"
    console.log(res2.result.children);
    this.userlist=res2.result.children.filter(i=>i.status==0)
   },

 //展示编辑用户的对话框
 async showEditDialog(id){
 const confirmResult= await this.$confirm('同意通过该流程', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'primary'
        }).catch(err=>err)

        //如果用户确认删除，则返回值为字符串confirm
        //如果用户取消了删除，则返回值为字符串 cancel
        if(confirmResult!=='confirm'){
            return this.$message.info('已取消')
        }

       
        await this.$http({
          url:'/successreviewDetail',
          method:'get',
          params:{id1:window.sessionStorage.getItem("id"),id2:id
          }
      })
        this.$message.success('通过流程成功！')
        this.getUserList()
 },

 //根据Id删除对应的用户信息
async removeUserById(id){
    //弹框询问用户是否删除数据
    const confirmResult= await this.$confirm('拒绝通过该流程', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)

        //如果用户确认删除，则返回值为字符串confirm
        //如果用户取消了删除，则返回值为字符串 cancel
        if(confirmResult!=='confirm'){
            return this.$message.info('已取消')
        }

       
        await this.$http({
          url:'/deletereviewDetail',
          method:'get',
          params:{id1:window.sessionStorage.getItem("id"),id2:id
          }
      })
        this.$message.success('已拒绝该流程！')
        this.getUserList()
},


 },
 created(){
     this.url=this.$route.params.id||window.sessionStorage.getItem("id")
},
mounted(){
     this.getUserList()
}

}
</script>

<style lang="less" scoped>

</style>