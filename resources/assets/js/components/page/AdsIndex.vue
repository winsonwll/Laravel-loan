<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 广告管理</el-breadcrumb-item>
                <el-breadcrumb-item>广告列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-select
                    v-model="listQuery.aid"
                    clearable
                    filterable
                    placeholder="全部产品">
                <el-option v-for="(item, key) in allAppsOptions"
                           :key="item.id"
                           :label="item.id+' - '+item.name"
                           :value="item.id">
                </el-option>
            </el-select>
            <el-date-picker
                    clearable
                    v-model="date"
                    type="daterange"
                    align="center"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdsAdd">添加广告</el-button>
        </div>

        <el-table
                :data="tableData"
                stripe
                border
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
            <el-table-column prop="name" label="产品名称" align="center"></el-table-column>

            <el-table-column label="广告信息" align="center">
                <el-table-column prop="title" label="广告标题" align="center"></el-table-column>
                <el-table-column label="广告类型" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.type == 1">启动页广告</template>
                        <template v-else-if="scope.row.type == 2">弹窗广告</template>
                        <template v-else>banner广告</template>
                    </template>
                </el-table-column>
                <el-table-column label="广告图片" align="center">
                    <template slot-scope="scope"><img :src="scope.row.pic" width="200"></template>
                </el-table-column>
                <el-table-column prop="showCnt" label="曝光展示数" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="数据统计" align="center">
                <el-table-column prop="viewCnt" label="浏览数" align="center"></el-table-column>
                <el-table-column prop="clickCnt" label="点击数" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status | filterStatus}}
                    <el-button size="small" type="warning" @click="handleOffline(scope.$index, scope.row)" v-if="scope.row.status == 1">下线</el-button>
                    <el-button size="small" type="primary" @click="handleOnline(scope.$index, scope.row)" v-else>上线</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="status" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.status != 4">删除</el-button>
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
    import { fetchAllApps, fetchAdList, fetchAdOnline, fetchAdOffline, fetchAdDel } from '../../fetch'
    import { ERR_OK } from '../../utils/config'
    import { pickerOptions, GMTToStr } from '../../utils/index'

    export default {
        data() {
            return {
                listLoading: true,
                allAppsOptions: [],
                pickerOptions: {
                    shortcuts: pickerOptions
                },
                date: null,
                listQuery: {
                    page: 1,
                    aid: undefined,
                    tm_from: undefined,
                    tm_to: undefined
                },
                tableData: [],
                total: 0
            }
        },
        created() {
            this.getData()
        },

        mounted() {
            this.$nextTick(() => {
                this.getAllApps()
            })
        },

        methods: {
            //获取所有产品
            getAllApps() {
                fetchAllApps()
                        .then((res) => {
                            if(res && res.data.status == ERR_OK){
                                this.allAppsOptions = res.data.data
                            }else {
                                this.$message.error('获取列表数据失败')
                            }
                        })
                        .catch((error) => {
                            this.$message.error(error)
                        })
            },

            // 获取列表
            getData(){
                this.listLoading = true

                fetchAdList(this.listQuery)
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
                if(!this.listQuery.aid && !this.date) return

                if(this.date){
                    this.listQuery.tm_from = GMTToStr(this.date[0])
                    this.listQuery.tm_to = GMTToStr(this.date[1])
                }

                this.listQuery.page = 1
                this.getData()
            },

            // 添加产品
            handleAdsAdd() {
                this.$router.push('/adscreate')
            },

            // 分页
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getData()
            },

            // 上线
            handleOnline(index, row) {
                let id = row.id

                this.$confirm('此操作将上线广告 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAdOnline(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].status = 1
                                        this.$message.success('上线成功')
                                    }else {
                                        this.$message.error('上线失败')
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error);
                                })
                        })
                        .catch(() => {
                            console.log('已取消操作')
                        })
            },

            // 下线
            handleOffline(index, row) {
                let id = row.id

                this.$confirm('此操作将下线广告 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAdOffline(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].status = 2
                                        this.$message.success('下线成功')
                                    }else {
                                        this.$message.error('下线失败')
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

            // 编辑
            handleEdit(index, row) {
                let id = row.id
                this.$router.push(`/adsedit/${id}`)
            },

            // 删除
            handleDelete(index, row) {
                let id = row.id

                this.$confirm('此操作将删除广告 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAdDel(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        const index = this.tableData.indexOf(row)
                                        this.tableData.splice(index, 1)
                                        --this.total
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