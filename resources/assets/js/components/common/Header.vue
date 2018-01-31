<template>
    <el-header height="70px">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../images/avatar.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script type="text/ecmascript-6">
    import { fetchLogout } from '../../fetch'
    import { ERR_OK } from '../../utils/config'
    import { getToken, removeToken } from '../../utils/auth'

    export default {
        data() {
            return {
                name: '管理员'
            }
        },

        computed: {
            username(){
                let username = getToken()
                return username ? username : this.name
            }
        },

        methods: {
            handleCommand(command) {
                switch(command){
                    case 'logout':
                        this.$confirm('确认要退出吗？', '温馨提示', { type: 'warning' })
                                .then(() => {
                                    fetchLogout()
                                            .then((res) => {
                                                if(res && res.data.status == ERR_OK){
                                                    removeToken()
                                                    this.$message.success('退出成功')
                                                    this.$router.push('/login')
                                                }else {
                                                    this.$message.error('退出失败')
                                                }
                                            })
                                            .catch((error) => {
                                                this.$message.error(error)
                                            })
                                })
                                .catch(() => {
                                    console.log('已取消操作')
                                })
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #242f42;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
