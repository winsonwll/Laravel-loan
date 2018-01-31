<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-date"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-box">
            <h3>基本信息</h3>
            <el-row :gutter="20">
                <el-col :span="4">ID</el-col>
                <el-col :span="20">{{ appData.id }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">产品名称</el-col>
                <el-col :span="20">{{ appData.name }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">产品ICON</el-col>
                <el-col :span="20"><img :src="appData.icon" width="80"></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">借款额度</el-col>
                <el-col :span="20">{{ appData.min_money }}-{{ appData.max_money }} 元</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">借款期限</el-col>
                <el-col :span="20">{{ appData.min_term }}-{{ appData.max_term }} 天</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">费率类型</el-col>
                <el-col :span="20">{{ appData.interest_type > 0 ? '月费率' : '日费率' }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">参考费率</el-col>
                <el-col :span="20">{{ appData.min_rate }}-{{ appData.max_rate }} %</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">申请条件</el-col>
                <el-col :span="20">{{ appData.requirements }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">认证资料</el-col>
                <el-col :span="20">{{ appData.authentication | filterAuthentication }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">申请跳转链接</el-col>
                <el-col :span="20">{{ appData.link }}</el-col>
            </el-row>

            <h3>数据统计</h3>
            <el-row :gutter="20">
                <el-col :span="4">投放单价</el-col>
                <el-col :span="20">{{ appData.price }} 元</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">投放数量</el-col>
                <el-col :span="20">{{ appData.count }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">申请人数</el-col>
                <el-col :span="20">{{ appData.applicants }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">借款成功率</el-col>
                <el-col :span="20">{{ appData.success_rate }} %</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">浏览数</el-col>
                <el-col :span="20">{{ appData.viewCnt }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">点击申请数</el-col>
                <el-col :span="20">{{ appData.clickCnt }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">是否推荐</el-col>
                <el-col :span="20">{{appData.is_hot > 0 ? '推荐' : '不推荐'}}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">排序</el-col>
                <el-col :span="20">{{ appData.sort_order }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">状态</el-col>
                <el-col :span="20">{{appData.status | filterStatus}}</el-col>
            </el-row>

            <h3>附属信息</h3>
            <el-row :gutter="20">
                <el-col :span="4">描述</el-col>
                <el-col :span="20">{{ appData.description }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">最快放款时间</el-col>
                <el-col :span="20">{{ appData.lend_time }} 分钟</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">可借贷人群</el-col>
                <el-col :span="20">{{ appData.user_type | filterUserType }}</el-col>
            </el-row>

            <h3>借贷公司信息</h3>
            <el-row :gutter="20">
                <el-col :span="4">所属公司</el-col>
                <el-col :span="20">{{ appData.c_name }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">客服电话</el-col>
                <el-col :span="20">{{ appData.c_phone }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">信贷联系人</el-col>
                <el-col :span="20">{{ appData.c_mobile }}</el-col>
            </el-row>

            <h3>时间信息</h3>
            <el-row :gutter="20">
                <el-col :span="4">上线时间</el-col>
                <el-col :span="20">{{ appData.start_time }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">结束时间</el-col>
                <el-col :span="20">{{ appData.end_time }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">创建时间</el-col>
                <el-col :span="20">{{ appData.created_at }}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">更新时间</el-col>
                <el-col :span="20">{{ appData.updated_at }}</el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchAppShow } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data() {
            return {
                appData: {}
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                let id = this.$route.params.id

                fetchAppShow(id)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            this.appData = res.data.data
                        }else {
                            this.$message.error('获取产品信息失败')
                        }
                    })
                    .catch((error) => {
                        this.$message.error(error)
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1e3)
                    })
            }
        }
    }
</script>

<style scoped>
    .info-box {
        width: 70%;
    }
    .el-col {
        padding: 15px 0;
        border-top: 1px solid #eee;
        color: #666;
    }
    h3 {
        font-size: 14px;
        padding: 15px 0;;
    }
    .bot-btn {
        margin-top: 20px;
    }
</style>