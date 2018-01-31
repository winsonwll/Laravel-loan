<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>申请记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table
                :data="tableData"
                stripe
                border
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
            <el-table-column prop="aid" label="产品ID" align="center"></el-table-column>
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
    import { fetchUserRecord } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data() {
            return {
                listLoading: true,
                tableData: [],
                cur_page: 1,
                total: 0
            }
        },
        created() {
            this.getRecords()
        },
        methods: {
            // 获取列表
            getRecords(){
                let uid = this.$route.params.uid

                this.listLoading = true
                fetchUserRecord(uid)
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

            // 分页
            handleCurrentChange(val){
                this.cur_page = val
                this.getData()
            }
        }
    }
</script>