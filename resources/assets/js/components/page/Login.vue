<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <el-input v-model="ruleForm.vcode" placeholder="请输入验证码" style="width: 175px; vertical-align: 15px;"></el-input>
                    <img :src="vcodeImg" style="cursor: pointer" @click="handleChange">
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登 录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchCp, fetchLogin } from '../../fetch'
    import { BASE_ADMIN, ERR_OK } from '../../utils/config'
    import { setToken } from '../../utils/auth'

    export default {
        data: function(){
            var validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(value.length < 6 || value.length > 12){
                        callback(new Error('密码为 6-12 位字符'));
                    }
                    callback();
                }
            };

            return {
                //vcodeImg: fetchCaptcha,
                vcodeImg: '',
                ruleForm: {
                    name: '',
                    password: '',
                    vcode: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 12, message: '用户名为6-12位字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePwd, trigger: 'blur' }
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
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    })
            },

            handleChange() {
                this.ruleForm.vcode = ''
                this.getCp()
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.loading = true

                        fetchLogin(this.ruleForm)
                            .then((res) => {
                                if(res && res.data.status == ERR_OK){
                                    setToken(this.ruleForm.name)
                                    this.$message.success('登录成功')

                                    setTimeout(() => {
                                        this.$router.push({path: '/'})
                                    }, 1e3)
                                }else {
                                    this.handleChange()
                                    this.$message.error(res.data.msg)
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