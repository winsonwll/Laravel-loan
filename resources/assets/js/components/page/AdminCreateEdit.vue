<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-date"></i> 管理员管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
                <el-tooltip content="用户名为 6-12 位字符" placement="top">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model.trim="ruleForm.name" :disabled="isDisabled" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                </el-tooltip>

                <el-tooltip content="密码为 6-12 位字符" placement="top">
                    <el-form-item label="密 码" prop="password">
                        <el-input type="password" v-model.trim="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-tooltip>
                <el-form-item label="确认密码" prop="repassword">
                    <el-input type="password" v-model.trim="ruleForm.repassword" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="权 限" prop="auth">
                    <el-radio v-model="ruleForm.auth" label="0">普通管理员</el-radio>
                    <el-radio v-model="ruleForm.auth" label="1">超级管理员</el-radio>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">确认提交</el-button>
                    <el-button @click="cancelForm">取 消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fetchAdminEdit, fetchAdminSaveEdit, fetchAdminSaveAdd } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data: function () {
            const validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if(value.length < 6 || value.length > 12){
                        callback(new Error('密码为 6-12 位字符'))
                    }
                    callback();
                }
            }
            const validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback();
                }
            }

            return {
                isDisabled: false,
                id: '',
                ruleForm: {
                    name: '',
                    password: '',
                    repassword: '',
                    auth: '0'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 12, message: '用户名为6-12位字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePwd, trigger: 'blur' }
                    ],
                    repassword: [
                        { required: true, validator: validateRePwd, trigger: 'blur' }
                    ],
                    auth: [
                        { required: true, message: '请选择权限', trigger: 'change'}
                    ]
                },
                loading: false
            }
        },
        computed: {
            isEdit() {
                return this.$route.meta.isEdit
            }
        },
        created() {
            if (this.isEdit) {
                this.isDisabled = true
                this.id = this.$route.params.id
                this.getAdminInfo()
            }
        },
        methods: {
            // 编辑页面信息
            getAdminInfo() {
                fetchAdminEdit(this.id)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            let data = res.data.data
                            data.password = ''
                            data.auth = data.auth+''

                            this.ruleForm = data
                        }else {
                            this.$message.error('获取信息失败')
                        }
                    })
                    .catch((error) => {
                            this.$message.error(error)
                    })
            },

            onSubmit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.loading = true

                        if (this.isEdit) {
                            // 修改提交
                            fetchAdminSaveEdit(this.id, this.ruleForm)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.$message.success('修改成功')
                                        setTimeout(() => {
                                            this.$router.push('/admin')
                                        }, 1e3)
                                    }else {
                                        this.$message.error('修改失败')
                                    }
                                    this.loading = false
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        } else {
                            // 添加提交
                            fetchAdminSaveAdd(this.ruleForm)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.$message.success('创建成功')
                                        setTimeout(() => {
                                            this.$router.push('/admin')
                                        }, 1e3)
                                    }else {
                                        this.$message.error('创建失败')
                                    }
                                    this.loading = false
                                })
                                .catch((error) => {
                                    this.$message.error(error)
                                })
                        }
                    } else {
                        return false
                    }
                })
            },

            cancelForm() {
                this.$router.go(-1)
            }
        }
    }
</script>