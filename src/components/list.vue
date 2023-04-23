<template>
  <div>
    <!-- 卡片试图区域 -->
      <h1>杨政恒审核平台-列表页</h1>

 <el-card >
     <!-- 搜索与添加区域 -->
        <!--查询表单-->
    <el-form :inline="true"
             class="demo-form-inline"
             :model="queryInfo">
      <el-form-item>
        <el-input v-model="queryInfo.username"
                  placeholder="用户名"
                  style="width: 100%" />
      </el-form-item>
       <el-form-item>
        <el-input v-model="queryInfo.userline"
                  placeholder="产品线"
                  style="width: 100%" />
      </el-form-item>
       <el-form-item>
        <el-input v-model="queryInfo.industry"
                  placeholder="一级行业"
                  style="width: 100%" />
      </el-form-item>
       <el-form-item>
        <el-input v-model="queryInfo.createTime"
                  placeholder="任务开始时间"
                  style="width: 100%" />
      </el-form-item>
      ~
     <el-form-item>
        <el-input v-model="queryInfo.endTime"
                  placeholder="任务结束时间"
                  style="width: 100%" />
      </el-form-item>

      <el-button type="primary"
                 icon="el-icon-search"
                 @click="toQuery">查询</el-button>
    
    </el-form>

        <!-- 用户列表区域 -->
        <!-- border为边框线,stripe为滑动后会变化颜色 -->
        <el-table :data="userlist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户名" prop="name"></el-table-column>
            <el-table-column label="产品线" prop="profession"></el-table-column>
            <el-table-column label="所属一级行业" prop="o1_name"></el-table-column>
            <el-table-column label="所属二级行业" prop="o2_name"></el-table-column>
            <el-table-column label="创建时间" prop="createdTime"></el-table-column>
           
            <el-table-column label="操作">
                <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="success" icon="el-icon-zoom-in" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                         <el-button type="danger" icon="el-icon-delete"  size="mini" @click="removeUserById(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- 分页区域 -->
         <el-pagination
            @size-change="handleSizeChanged"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1,2,5,10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
     </el-card>

  </div>
</template>

<script>
export default {
 name:'UserPage',
 data(){
    return{
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
      total:0,
     }
 },
 methods:{
     // 查询
    async toQuery () {
        const {data:res} = await this.$http({
          url:'/videosList',
          method:'get',
          params:{pagenum:this.queryInfo.pagenum,
                  pagesize:this.queryInfo.pagesize,
                  username:this.queryInfo.username,
                  userline:this.queryInfo.userline,
                  industry:this.queryInfo.industry,
                  createTime:this.queryInfo.createTime,
                  endTime:this.queryInfo.endTime
          }
      })
      this.userlist=res.result.resultData
      this.total=res.result.pagecount
    },

     //获取用户列表
   async getUserList(){
      const {data:res} = await this.$http({
          url:'/videosList',
          method:'get',
          params:{pagenum:this.queryInfo.pagenum,
                  pagesize:this.queryInfo.pagesize,
                  username:this.queryInfo.username,
                  userline:this.queryInfo.userline,
                  industry:this.queryInfo.industry,
                  createTime:this.queryInfo.createTime,
                  endTime:this.queryInfo.endTime
          }
      })
      this.userlist=res.result.resultData
      this.total=res.result.pagecount
   },

    //监听pagesize改变的事件
 handleSizeChanged(newSize){
     this.queryInfo.pagesize=newSize
     this.getUserList()
 },
 //监听页码值改变的事件
 handleCurrentChange(newPage){
     this.queryInfo.pagenum=newPage
     this.getUserList()
 },
 

 //展示编辑用户的对话框
 async showEditDialog(id){
window.sessionStorage.setItem("id",id)
     this.$router.push({
            path:'/review',
            name:'review',
            params:{
                id:id
            }
        })
 },

 //根据Id删除对应的用户信息
async removeUserById(id){
    //弹框询问用户是否删除数据
    const confirmResult= await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)

        //如果用户确认删除，则返回值为字符串confirm
        //如果用户取消了删除，则返回值为字符串 cancel
        if(confirmResult!=='confirm'){
            return this.$message.info('已取消删除')
        }

       
        await this.$http({
          url:'/deletevideosList',
          method:'get',
          params:{id:id
          }
      })
        this.$message.success('删除用户成功！')
        this.getUserList()
},
 },
 created(){
 },
mounted(){
     this.getUserList()
}

}
</script>

<style lang="less" scoped>

</style>