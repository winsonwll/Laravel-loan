<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-date"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="isEdit">编辑产品</el-breadcrumb-item>
                <el-breadcrumb-item v-else>添加产品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
                <h3>基本信息</h3>
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="产品ICON" prop="file">
                    <el-upload
                            ref="upload"
                            :action="uploadUrl"
                            :multiple="false"
                            list-type="picture"
                            :file-list="ruleForm.file"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :on-success="handleSuccess"
                            :on-error="handleError">
                        <el-button slot="trigger" size="small" type="success">上传图片</el-button>
                        <div slot="tip" class="el-upload__tip">尺寸 128x128；只能上传jpg/png/gif文件，且不超过2MB</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="最低借款额度" prop="min_money">
                    <el-input v-model.number="ruleForm.min_money" placeholder="请输入最低借款额度" :min="1">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最高借款额度" prop="max_money">
                    <el-input v-model.number="ruleForm.max_money" placeholder="请输入最高借款额度" :min="1">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低借款期限" prop="min_term">
                    <el-input v-model.number="ruleForm.min_term" placeholder="请输入最低借款期限" :min="1">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最高借款期限" prop="max_term">
                    <el-input v-model.number="ruleForm.max_term" placeholder="请输入最高借款期限" :min="1">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="费率类型" prop="interest_type">
                    <el-radio v-model="ruleForm.interest_type" label="0">日费率</el-radio>
                    <el-radio v-model="ruleForm.interest_type" label="1">月费率</el-radio>
                </el-form-item>
                <el-form-item label="最小费率" prop="min_rate">
                    <el-input v-model="ruleForm.min_rate" placeholder="请输入最小费率">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最大费率" prop="max_rate">
                    <el-input v-model="ruleForm.max_rate" placeholder="请输入最大费率">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="申请条件" prop="requirements">
                    <el-input v-model.trim="ruleForm.requirements" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入申请条件，多个回车换行"></el-input>
                    <div class="el-input__tip">
                        <h4>参考格式：</h4>
                        <p>
                            1.22-55周岁大陆公民；<br>
                            2.本人手机号实名制，且已使用半年以上；<br>
                            3.芝麻信用分600分以上。
                        </p>
                    </div>
                </el-form-item>
                <el-form-item label="认证资料" prop="authentication">
                    <el-checkbox-group v-model="ruleForm.authentication">
                        <el-checkbox label="0">基本信息</el-checkbox>
                        <el-checkbox label="1">身份认证</el-checkbox>
                        <el-checkbox label="2">手机认证</el-checkbox>
                        <el-checkbox label="3">芝麻信用</el-checkbox>
                        <el-checkbox label="4">信用卡</el-checkbox>
                        <el-checkbox label="5">填写联系人</el-checkbox>
                        <el-checkbox label="6">填写工作信息</el-checkbox>
                        <el-checkbox label="7">信用卡账单</el-checkbox>
                        <el-checkbox label="8">淘宝认证</el-checkbox>
                        <el-checkbox label="9">征信查询</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="申请跳转链接" prop="link">
                    <el-input v-model.trim="ruleForm.link" placeholder="请输入申请跳转链接"></el-input>
                    <div class="el-input__tip">需要带http(s)://</div>
                </el-form-item>

                <h3>投放信息</h3>
                <el-form-item label="投放单价" prop="price">
                    <el-input v-model="ruleForm.price" placeholder="请输入投放单价">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="投放数量" prop="count">
                    <el-input-number v-model.number="ruleForm.count" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="是否推荐" prop="is_hot">
                    <el-switch v-model="ruleForm.is_hot" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>

                <h3>附属信息</h3>
                <el-form-item label="申请人数" prop="applicants">
                    <el-input v-model.number="ruleForm.applicants" placeholder="请输入申请人数" :min="1"></el-input>
                </el-form-item>
                <el-form-item label="借款成功率" prop="success_rate">
                    <el-input v-model="ruleForm.success_rate" placeholder="请输入借款成功率">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="描 述" prop="description">
                    <el-input v-model.trim="ruleForm.description" placeholder="多个用空格隔开"></el-input>
                    <div class="el-input__tip"><b>参考格式：</b>10秒审批 最高5万 放款快，利率低</div>
                </el-form-item>
                <el-form-item label="最快放款时间" prop="lend_time">
                    <el-input v-model.number="ruleForm.lend_time" placeholder="请输入最快放款时间" :min="0">
                        <template slot="append">分钟</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="可借贷人群" prop="user_type">
                    <el-checkbox-group v-model="ruleForm.user_type">
                        <el-checkbox label="0">无工作</el-checkbox>
                        <el-checkbox label="1">蓝领</el-checkbox>
                        <el-checkbox label="2">白领</el-checkbox>
                        <el-checkbox label="3">上班族</el-checkbox>
                        <el-checkbox label="4">个体户</el-checkbox>
                        <el-checkbox label="5">企业主</el-checkbox>
                        <el-checkbox label="6">学生党</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <h3>借贷公司信息</h3>
                <el-form-item label="所属公司" prop="c_name">
                    <el-input v-model.trim="ruleForm.c_name" placeholder="请输入所属公司"></el-input>
                </el-form-item>
                <el-form-item label="客服电话" prop="c_phone">
                    <el-input v-model.trim="ruleForm.c_phone" placeholder="请输入客服电话"></el-input>
                </el-form-item>
                <el-form-item label="信贷联系人" prop="c_mobile">
                    <el-input v-model.trim="ruleForm.c_mobile" placeholder="请输入信贷联系人"></el-input>
                    <div class="el-input__tip"><b>参考格式：</b>王某某：18711111111</div>
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
    import { fetchAppUploadUrl, fetchAppEdit, fetchAppSaveEdit, fetchAppSaveAdd } from '../../fetch'
    import { ERR_OK } from '../../utils/config'
    import { validateURL } from '../../utils/index'

    export default {
        data: function () {
            const validateIcon = (rule, value, callback) => {
                if(!this.ruleForm.file.length){
                    callback(new Error('请上传产品ICON'));
                }else{
                    callback();
                }
            };

            const validateLinkUri = (rule, value, callback) => {
                if (value) {
                    if (validateURL(value)) {
                        callback()
                    } else {
                        callback(new Error('链接填写不正确'));
                    }
                } else {
                    callback(new Error('请输入申请跳转链接'))
                }
            };

            return {
                id: '',
                uploadUrl: fetchAppUploadUrl,
                ruleForm: {
                    name: '',
                    file: [],
                    min_money: undefined,
                    max_money: undefined,
                    min_term: undefined,
                    max_term: undefined,
                    interest_type: '1',
                    min_rate: undefined,
                    max_rate: undefined,
                    requirements: '',
                    authentication: [],
                    link: '',
                    applicants: undefined,
                    success_rate: undefined,
                    description: '',
                    lend_time: undefined,
                    user_type: [],
                    c_name: '',
                    c_phone: '',
                    c_mobile: '',
                    price: undefined,
                    count: undefined,
                    is_hot: '0'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    file: [
                        { required: true, validator: validateIcon, trigger: 'change' }
                    ],
                    min_money: [
                        { type: 'number', required: true, message: '请输入正确的最低借款额度', trigger: 'blur' }
                    ],
                    max_money: [
                        { type: 'number', required: true, message: '请输入正确的最高借款额度', trigger: 'blur' }
                    ],
                    min_term: [
                        { type: 'number', required: true, message: '请输入正确的最低借款期限', trigger: 'blur' }
                    ],
                    max_term: [
                        { type: 'number', required: true, message: '请输入正确的最高借款期限', trigger: 'blur' }
                    ],
                    interest_type: [
                        { required: true, message: '请选择费率', trigger: 'change'}
                    ],
                    min_rate: [
                        { required: true, message: '请输入正确的最小费率', trigger: 'blur' }
                    ],
                    max_rate: [
                        { required: true, message: '请输入正确的最大费率', trigger: 'blur' }
                    ],
                    requirements: [
                        { required: true, message: '请输入申请条件', trigger: 'blur' }
                    ],
                    authentication: [
                        { type: 'array', required: true, message: '请选择认证资料', trigger: 'change' }
                    ],
                    link: [
                        { required: true, validator: validateLinkUri, trigger: 'blur' }
                    ],
                    applicants: [
                        { type: 'number', message: '请输入正确的申请人数', trigger: 'blur' }
                    ],
                    success_rate: [
                        { message: '请输入正确的借款成功率', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    lend_time: [
                        { type: 'number', required: true, message: '请输入正确的最快放款时间', trigger: 'blur' }
                    ],
                    user_type: [
                        { type: 'array',  required: true, message: '请选择可借贷人群', trigger: 'change' }
                    ],
                    c_name: [
                        { required: true, message: '请输入所属公司', trigger: 'blur' }
                    ],
                    c_phone: [
                        { required: true, message: '请输入客服电话', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入正确的投放单价', trigger: 'blur' }
                    ],
                    count: [
                        { type: 'number', required: true, message: '请输入正确的投放数量', trigger: 'blur' }
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
                this.id = this.$route.params.id
                this.getAppInfo()
            }
        },
        methods: {
            // 编辑页面信息
            getAppInfo() {
                let id = this.id

                fetchAppEdit(id)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            let data = res.data.data

                            data.authentication = data.authentication.split(',')
                            data.user_type = data.user_type.split(',')
                            data.interest_type = data.interest_type+''
                            data.is_hot = data.is_hot+''

                            data.file = [{
                                'name': data.name,
                                'url': data.icon
                            }]
                            this.ruleForm = data
                        }else {
                            this.$message.error('获取产品信息失败');
                        }
                    })
                    .catch((error) => {
                            this.$message.error(error);
                    })
            },

            handleExceed(files, fileList) {
                this.$message.warning('当前已选择了 1 个文件，您可以删除重新上传')
            },
            beforeUpload(file) {
                let isImg = false,
                        isLt2M = file.size / 1024 / 1024 < 2;

                switch (file.type){
                    case 'image/jpg':
                        isImg = true;
                        break;
                    case 'image/jpeg':
                        isImg = true;
                        break;
                    case 'image/png':
                        isImg = true;
                        break;
                    case 'image/gif':
                        isImg = true;
                        break;
                }

                if (!isImg) {
                    this.$message.error('上传图片格式不正确');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB');
                }
                return isImg && isLt2M;
            },
            handleSuccess(res, file, fileList) {
                if(res && res.status == ERR_OK){
                    this.ruleForm.file = fileList
                }else{
                    this.$message.error(res.msg)
                }
            },
            handleError(err, file, fileList) {
                this.$message.error(err.msg)
            },

            onSubmit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.loading = true

                        if (this.isEdit) {
                            // 修改提交
                            let tmp = this.ruleForm
                            delete tmp.clickCnt
                            delete tmp.file
                            delete tmp.viewCnt

                            fetchAppSaveEdit(this.id, tmp)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.$message.success('修改成功')
                                        setTimeout(() => {
                                            this.$router.push('/index')
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
                            fetchAppSaveAdd(this.ruleForm)
                                .then((res) => {
                                    if(res && res.data.status == ERR_OK){
                                        this.$message.success('创建成功')
                                        setTimeout(() => {
                                            this.$router.push('/index')
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

<style scoped>
    h3 {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin: 30px 0 20px 0;
    }
    .el-input__tip {
        font-size: 12px;
        color: #5a5e66;
        margin-top: 15px;
        line-height: 24px;
    }
</style>