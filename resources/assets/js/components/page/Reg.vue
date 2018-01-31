<template>
    <div class="login-wrap">
        <div class="ms-title">用户注册</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <el-input v-model="ruleForm.vcode" placeholder="请输入图像验证码" style="width: 175px; vertical-align: 15px;"></el-input>
                    <img :src="vcodeImg" style="cursor: pointer" @click="handleChange">
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="ruleForm.code" placeholder="请输入短信验证码" style="width: 175px;"></el-input>
                    <el-button @click="handleGetSmscode">获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请设置密码" type="password"></el-input>
                </el-form-item>

                <el-form-item prop="isAgree">
                    <el-checkbox v-model="ruleForm.isAgree">我同意 <a href="">《贷款导航的协议》</a></el-checkbox>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">立即注册</el-button>
                </div>


                <el-button type="primary" @click="confirmPhone">下一步</el-button>

                <el-button type="primary" @click="resetPwd">重置密码</el-button>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchCp, fetchSmscode, fetchReg, fetchConfirmPhone, fetchResetPwd } from '../../fetch/api'
    import { BASE_API, ERR_OK } from '../../utils/config'

    export default {
        data: function(){
            return {
                vcodeImg: '',
                session: '',
                ruleForm: {
                    phone: undefined,
                    vcode: undefined,
                    code: undefined,
                    password: undefined,
                    isAgree: true
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    vcode: [
                        { required: true, message: '请输入图像验证码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
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
                        this.session = res.data.data.session
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            handleChange() {
                this.ruleForm.vcode = ''
                this.getCp()
            },

            handleGetSmscode() {
                fetchSmscode({
                    phone: this.ruleForm.phone,
                    vcode: this.ruleForm.vcode,
                    session: this.session
                })
                    .then((res) => {
                        if(res && res.status == 200 && res.data.status == 0){
                            this.$message.success('发送成功！')
                        }else {
                            this.$message.error(res.data.msg)
                            this.handleChange()
                        }
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            confirmPhone() {
                fetchConfirmPhone({
                        phone: this.ruleForm.phone,
                        code: this.ruleForm.code
                    })
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((error) => {
                            this.$message.error(error)
                        })
            },

            resetPwd() {
                fetchResetPwd({
                        phone: this.ruleForm.phone,
                        code: this.ruleForm.code,
                        password: '222222',
                        repassword: '222222'
                    })
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((error) => {
                            this.$message.error(error)
                        })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.loading = true

                        fetchReg({
                            phone: this.ruleForm.phone,
                            code: this.ruleForm.code,
                            password: this.ruleForm.password
                        })
                            .then((res) => {
                                if(res && res.status == 200 && res.data.status == 0){
                                    this.$message.success('注册成功')
                                    this.$router.push('/log')
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
        height:361px;
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