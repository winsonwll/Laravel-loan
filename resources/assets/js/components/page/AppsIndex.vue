<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-select
                    v-model="listQuery.id"
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
            <el-button type="primary" icon="el-icon-plus" @click="handleAppsAdd">添加产品</el-button>
        </div>

        <div class="plugins-tips">
            <i class="el-icon-upload2"></i> 移动到列表行拖拽可改变排序
        </div>

        <el-table
                :data="tableData"
                stripe
                border
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
            <el-table-column label="产品ICON" align="center">
                <template slot-scope="scope"><img :src="scope.row.icon" width="80"></template>
            </el-table-column>

            <el-table-column label="借款信息" align="center">
                <el-table-column label="借款额度" align="center">
                    <template slot-scope="scope">{{scope.row.min_money}}-{{scope.row.max_money}} 元</template>
                </el-table-column>
                <el-table-column label="借款期限" align="center">
                    <template slot-scope="scope">{{scope.row.min_term}}-{{scope.row.max_term}} 天</template>
                </el-table-column>
                <el-table-column label="费率类型" align="center">
                    <template slot-scope="scope">{{scope.row.interest_type > 0 ? '月费率' : '日费率'}}</template>
                </el-table-column>
                <el-table-column label="参考费率" align="center">
                    <template slot-scope="scope">{{scope.row.min_rate}}-{{scope.row.max_rate}}{{scope.row.rate}} %</template>
                </el-table-column>
            </el-table-column>

            <el-table-column label="投放信息" align="center">
                <el-table-column label="投放单价" align="center">
                    <template slot-scope="scope">{{scope.row.price}} 元</template>
                </el-table-column>
                <el-table-column prop="count" label="投放数量" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="数据统计" align="center">
                <el-table-column prop="applicants" label="申请人数" align="center"></el-table-column>
                <el-table-column label="借款成功率" align="center">
                    <template slot-scope="scope">{{scope.row.success_rate}} %</template>
                </el-table-column>
                <el-table-column prop="viewCnt" label="浏览数" align="center"></el-table-column>
                <el-table-column prop="clickCnt" label="申请数" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="是否推荐" align="center">
                <template slot-scope="scope">
                    {{scope.row.is_hot > 0 ? '推荐' : '不推荐'}}
                    <el-button size="small" v-if="scope.row.is_hot == 1" @click="handleCancelRecom(scope.$index, scope.row)">取消推荐</el-button>
                    <el-button size="small" type="primary" v-else @click="handleRecom(scope.$index, scope.row)">推荐</el-button>
                </template>
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
                    <el-button size="small" @click="handleShow(scope.$index, scope.row)">查看</el-button>
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
    import { fetchAllApps, fetchAppList, fetchAppRecom, fetchAppCancelRecom, fetchAppOnline, fetchAppOffline, fetchAppDel, fetchSort } from '../../fetch'
    import { ERR_OK } from '../../utils/config'
    import { pickerOptions, GMTToStr } from '../../utils/index'
    import Sortable from 'sortablejs'

    let iTimer = null

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
                    id: undefined,
                    tm_from: undefined,
                    tm_to: undefined
                },
                tableData: [],
                total: 0,
                sortable: null,
                olderList: [],
                newList: []
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

                fetchAppList(this.listQuery)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            let result = res.data.data

                            this.tableData = result.data
                            this.total = result.total

                            this.olderList = this.tableData.map(v => v.id)
                            this.newList = this.olderList.slice()
                            this.$nextTick(() => {
                                this.setSort()
                            })
                        }else {
                            this.$message.error('获取列表数据失败');
                        }
                        this.listLoading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                        this.listLoading = false
                    })
            },

            //拖拽排序
            setSort() {
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
                this.sortable = Sortable.create(el, {
                    onEnd: evt => {
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)

                        clearTimeout(iTimer)
                        iTimer = setTimeout(() => {
                            fetchSort({
                                sort: this.newList
                            })
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.$message.success('排序更新成功')
                                    }else {
                                        this.$message.error('排序更新失败')
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        }, 1e3)
                    }
                })
            },

            // 查询
            handleSearch() {
                if(!this.listQuery.id && !this.date) return

                if(this.date){
                    this.listQuery.tm_from = GMTToStr(this.date[0])
                    this.listQuery.tm_to = GMTToStr(this.date[1])
                }

                this.listQuery.page = 1
                this.getData()
            },

            // 添加产品
            handleAppsAdd() {
                this.$router.push('/appscreate')
            },

            // 分页
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getData()
            },

            // 推荐
            handleRecom(index, row) {
                let id = row.id

                this.$confirm('此操作将推荐产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAppRecom(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].is_hot = 1
                                        this.$message.success('推荐成功');
                                    }else {
                                        this.$message.error('推荐失败');
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error);
                                })
                        })
                        .catch(() => {
                            console.log('已取消操作！')
                        })
            },

            // 取消推荐
            handleCancelRecom(index, row) {
                let id = row.id

                this.$confirm('此操作将取消推荐产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAppCancelRecom(id)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.tableData[index].is_hot = 0
                                        this.$message.success('取消推荐成功')
                                    }else {
                                        this.$message.error('取消推荐失败')
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

            // 上线
            handleOnline(index, row) {
                let id = row.id

                this.$confirm('此操作将上线产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAppOnline(id)
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

                this.$confirm('此操作将下线产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAppOffline(id)
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

            // 查看
            handleShow(index, row) {
                let id = row.id
                this.$router.push(`/appsshow/${id}`)
            },

            // 编辑
            handleEdit(index, row) {
                let id = row.id
                this.$router.push(`/appsedit/${id}`)
            },

            // 删除
            handleDelete(index, row) {
                let id = row.id

                this.$confirm('此操作将删除产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' })
                        .then(() => {
                            fetchAppDel(id)
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

    .plugins-tips {
        background: #eef1f6;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>