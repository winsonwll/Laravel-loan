<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 记录管理</el-breadcrumb-item>
                <el-breadcrumb-item>记录列表</el-breadcrumb-item>
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
            <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
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
                    <template slot-scope="scope">{{scope.row.min_rate}}-{{scope.row.max_rate}} %</template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="投放信息" align="center">
                <el-table-column label="投放单价 " align="center">
                    <template slot-scope="scope">{{scope.row.price}} 元</template>
                </el-table-column>
                <el-table-column prop="count" label="投放数量" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="数据统计" align="center">
                <el-table-column label="设备类型 " align="center">
                    <template slot-scope="scope">{{scope.row.client_type | filterClientType}}</template>
                </el-table-column>
                <el-table-column prop="address" label="地理位置" align="center"></el-table-column>
                <el-table-column prop="ip" label="申请时IP" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="created_at" label="申请时间" align="center"></el-table-column>
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
    import { fetchAllApps, fetchRecordList } from '../../fetch'
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
                listQuery: {
                    page: 1,
                    aid: undefined
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
                fetchRecordList(this.listQuery)
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
                if(!this.listQuery.aid) return

                this.listQuery.page = 1
                this.getData()
            },

            // 分页
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getData()
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