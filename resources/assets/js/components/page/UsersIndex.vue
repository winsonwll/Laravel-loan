<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-input v-model="keyword" placeholder="输入手机号" class="handle-input"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </div>

        <el-table
                :data="tableData"
                stripe
                border
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="realname" label="姓 名" align="center"></el-table-column>
            <el-table-column label="性 别" align="center">
                <template slot-scope="scope">{{scope.row.sex | filterUserSex}}</template>
            </el-table-column>
            <el-table-column label="设备类型 " align="center">
                <template slot-scope="scope">{{scope.row.client_type | filterClientType}}</template>
            </el-table-column>
            <el-table-column prop="last_login_ip" label="最近登录IP" align="center"></el-table-column>
            <el-table-column prop="last_login_time" label="最近登录时间" align="center"></el-table-column>
            <el-table-column label="状 态" align="center">
                <template slot-scope="scope">{{scope.row.status | filterUserStatus}}</template>
            </el-table-column>
            <el-table-column prop="created_at" label="注册时间" align="center"></el-table-column>

            <el-table-column label="操 作" prop="status" align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="handleRecord(scope.$index, scope.row)">查看记录</el-button>
                    <el-button size="small" type="danger" @click="handleFrozen(scope.$index, scope.row)" v-if="scope.row.status == 1">冻结</el-button>
                    <el-button size="small" type="warning" @click="handleThaw(scope.$index, scope.row)" v-if="scope.row.status == 2">解冻</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination" v-show="!listLoading && total">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchUserList, fetchUserFrozen, fetchUserThaw } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data() {
            return {
                listLoading: true,
                keyword: '',
                tableData: [],
                cur_page: 1,
                total: 0
            }
        },
        created() {
            this.getData()
        },
        methods: {
            // 获取列表
            getData(){
                let params = {}

                if(this.keyword){
                    params = {
                        keyword: this.keyword,
                        page: this.cur_page
                    };
                }else{
                    params = {
                        page: this.cur_page
                    };
                }

                this.listLoading = true

                fetchUserList(params)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            let result = res.data.data

                            this.tableData = result.data
                            this.total = result.total
                        }else {
                            this.$message.error('获取列表数据失败')
                        }
                        this.listLoading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                        this.listLoading = false
                    })
            },

            // 查询
            handleSearch() {
                if(!this.keyword) return

                this.cur_page = 1
                this.getData()
            },

            // 分页
            handleCurrentChange(val){
                this.cur_page = val
                this.getData()
            },

            // 冻结
            handleFrozen(index, row) {
                let id = row.id

                this.$confirm('此操作将冻结用户 ' + row.phone + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchUserFrozen(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].status = 2
                                        this.$message.success('冻结成功')
                                    }else {
                                        this.$message.error('冻结失败')
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        })
                        .catch(() => {
                            console.log('已取消操作')
                        })
            },

            // 解冻
            handleThaw(index, row) {
                let id = row.id

                this.$confirm('此操作将解冻用户 ' + row.phone + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchUserThaw(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].status = 1
                                        this.$message.success('解冻成功')
                                    }else {
                                        this.$message.error('解冻失败')
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        })
                        .catch(() => {
                            console.log('已取消操作')
                        })
            },

            // 申请记录
            handleRecord(index, row) {
                let uid = row.id
                this.$router.push(`/usersrecord/${uid}`)
            }
        },

        filters: {
            filterUserSex: function (sex) {
                if(!sex) return

                let s;
                switch (sex) {
                    case 0:
                        s = '先生'
                        break;
                    case 1:
                        s = '女士'
                        break;
                }
                return s
            },
            filterUserStatus: function (status) {
                if(!status) return

                let s;
                switch (status) {
                    case 1:
                        s = '有效'
                        break;
                    case 2:
                        s = '冻结'
                        break;
                    case 3:
                        s = '删除'
                        break;
                }
                return s
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .el-table .cell .el-button {
        margin: 5px 0;
    }
</style>