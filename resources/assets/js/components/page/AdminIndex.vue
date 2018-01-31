<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 管理员管理</el-breadcrumb-item>
                <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdminAdd">添加管理员</el-button>
        </div>

        <el-table
                :data="tableData"
                stripe
                border
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="用户名" align="center"></el-table-column>
            <el-table-column prop="pwd" label="密 码" align="center"></el-table-column>
            <el-table-column label="权 限" align="center">
                <template slot-scope="scope">{{scope.row.auth > 0 ? '超级管理员' : '普通管理员'}}</template>
            </el-table-column>
            <el-table-column prop="last_login_ip" label="最近登录IP" align="center"></el-table-column>
            <el-table-column prop="created_at" label="注册时间" align="center"></el-table-column>

            <el-table-column label="操 作" prop="auth" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchAdminList, fetchAdminDel } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data() {
            return {
                listLoading: true,
                tableData: []
            }
        },
        created() {
            this.getData()
        },
        methods: {
            // 获取列表
            getData(){
                this.listLoading = true
                fetchAdminList()
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            this.tableData = res.data.data
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

            // 添加
            handleAdminAdd() {
                this.$router.push('/admincreate')
            },

            // 编辑
            handleEdit(index, row) {
                let id = row.id
                this.$router.push(`/adminedit/${id}`)
            },

            // 删除
            handleDelete(index, row) {
                let id = row.id

                this.$confirm('此操作将删除管理员 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAdminDel(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        const index = this.tableData.indexOf(row)
                                        this.tableData.splice(index, 1)
                                        this.$message.success('删除成功')
                                    }else {
                                        this.$message.error('删除失败')
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        })
                        .catch(() => {
                            console.log('已取消操作')
                        })
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