<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-date"></i> 广告管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加广告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
                <el-form-item label="产品名称" prop="aid">
                    <el-select
                            v-model.number="ruleForm.aid"
                            clearable
                            filterable
                            placeholder="全部产品"
                            @change="handleAppsChange">
                        <el-option v-for="(item, key) in allAppsOptions"
                                   :key="key"
                                   :label="item.id+' - '+item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告标题" prop="title">
                    <el-input v-model.trim="ruleForm.title" placeholder="请输入广告标题"></el-input>
                </el-form-item>
                <el-form-item label="广告类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="0">banner广告</el-radio>
                        <el-radio label="1">启动页广告</el-radio>
                        <el-radio label="2">弹窗广告</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="广告图片" prop="file">
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
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，<span style="color: red">{{ type_tips[ruleForm.type] }}</span>，且不超过2MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="曝光展示数" prop="showCnt">
                    <el-input-number v-model.number="ruleForm.showCnt" :min="1" placeholder="请输入曝光展示数"></el-input-number>
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
    import { fetchAdUploadUrl, fetchAllApps, fetchAdEdit, fetchAdSaveEdit, fetchAdSaveAdd } from '../../fetch'
    import { ERR_OK } from '../../utils/config'

    export default {
        data: function () {
            const validateIcon = (rule, value, callback) => {
                if(!this.ruleForm.file.length){
                    callback(new Error('请上传广告图片'))
                }else{
                    callback()
                }
            };

            return {
                id: '',
                allAppsOptions: [],
                type_tips: ['尺寸：640x200', '尺寸：1080x1920', '尺寸：650x960'],
                uploadUrl: fetchAdUploadUrl,
                ruleForm: {
                    aid: undefined,
                    name: undefined,
                    title: undefined,
                    type: '0',
                    file: [],
                    showCnt: undefined
                },
                rules: {
                    aid: [
                        { type:'number', required: true, message: '请选择产品', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请选择产品', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择广告类型', trigger: 'change'}
                    ],
                    file: [
                        { required: true, validator: validateIcon, trigger: 'change' }
                    ],
                    showCnt: [
                        { type: 'number', required: true, message: '请输入正确的曝光展示数', trigger: 'blur' }
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
                this.getAdInfo()
            }
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

            // 编辑页面信息
            getAdInfo() {
                fetchAdEdit(this.id)
                    .then((res) => {
                        if(res && res.data.status == ERR_OK){
                            let data = res.data.data

                            data.file = [{
                                'name': data.name,
                                'url': data.pic
                            }]

                            this.ruleForm.aid = data.aid
                            this.ruleForm.name = data.name
                            this.ruleForm.title = data.title
                            this.ruleForm.type = data.type+''
                            this.ruleForm.file = data.file
                            this.ruleForm.showCnt = data.showCnt
                        }else {
                            this.$message.error('获取产品信息失败')
                        }
                    })
                    .catch((error) => {
                            this.$message.error(error)
                    })
            },

            handleAppsChange(val) {
                let tmp = this.allAppsOptions.find((value, index, arr) => {
                    return value.id == val
                })

                this.ruleForm.name = tmp.name
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
                            fetchAdSaveEdit(this.id, this.ruleForm)
                                    .then((res) => {
                                        if(res && res.data.status == ERR_OK){
                                            this.$message.success('修改成功')
                                            setTimeout(() => {
                                                this.$router.push('/ads')
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
                            fetchAdSaveAdd(this.ruleForm)
                                    .then((res) => {
                                        if(res && res.data.status == ERR_OK){
                                            this.$message.success('创建成功')
                                            setTimeout(() => {
                                                this.$router.push('/ads')
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