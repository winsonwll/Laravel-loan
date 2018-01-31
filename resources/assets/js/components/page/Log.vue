<template>
    <div class="login-wrap">
        <div class="ms-title">用户登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <el-input v-model="ruleForm.vcode" placeholder="请输入验证码" style="width: 175px; vertical-align: 15px;"></el-input>
                    <img :src="vcodeImg" style="cursor: pointer" @click="handleChange">
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登 录</el-button>
                </div>

                <el-button type="primary" @click="getDetail">获取详情</el-button>
                <el-button type="primary" @click="getLoans">获取贷款列表</el-button>
                <el-button type="primary" @click="getLoan">获取具体贷款</el-button>
                <el-button type="primary" @click="getByZhima">用芝麻分借</el-button>

                <el-button type="primary" @click="postApply">点击申请</el-button>
                <el-button type="primary" @click="myRecords">我的申请记录列表</el-button>
                <el-button type="primary" @click="myRecord">我的申请记录</el-button>

                <el-button type="primary" @click="logout">退出登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchCp, fetchLogin, fetchDetail, fetchLoans, fetchLoan, fetchByZhima, fetchApply, fetchMyRecords, fetchMyRecord, fetchLogout } from '../../fetch/api'
    import { BASE_API, ERR_OK } from '../../utils/config'

    export default {
        data: function(){
            return {
                vcodeImg: '',
                ruleForm: {
                    phone: undefined,
                    password: undefined,
                    vcode: undefined,
                    session: undefined
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    vcode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                loading: false
            }
        },

        created(){
            this.getCp()
        },

        methods: {
            getCp() {
                fetchCp()
                    .then((res) => {
                        this.vcodeImg = res.data.data.captcha
                        this.ruleForm.session = res.data.data.session
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            handleChange() {
                this.ruleForm.vcode = ''
                this.getCp()
            },

            getDetail() {
                this.loading = true

                fetchDetail()
                    .then((res) => {
                        if(res && res.status == 200 && res.data.status == 0){
                            this.$message.success('请求成功')
                        }else {
                            this.$message.error(res.data.msg)
                            this.handleChange()
                        }
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            getLoans() {
                fetchLoans()
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            getLoan() {
                fetchLoan()
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            getByZhima() {
                fetchByZhima()
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            postApply() {
                fetchApply({
                    uid: 4,
                    aid: 1
                })
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            myRecords() {
                fetchMyRecords()
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            myRecord() {
                fetchMyRecord()
                    .then((res) => {
                        this.loading = false
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            logout() {
                fetchLogout()
                    .then((res) => {
                        this.loading = false
                        localStorage.removeItem('access_token')
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.loading = true

                        fetchLogin(this.ruleForm)
                            .then((res) => {
                                if(res && res.status == 200 && res.data.status == 0){
                                    this.$message.success('登录成功')
                                    localStorage.setItem('access_token', res.data.data.access_token)
                                    setTimeout(() => {
                                        this.$router.push({path: '/'})
                                    },1e3)
                                }else {
                                    this.$message.error(res.data.msg)
                                    this.handleChange()
                                }
                                this.loading = false
                            })
                            .catch((error) => {
                                this.$message.error(error)
                            })
                    } else{
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: #324157;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:210px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>