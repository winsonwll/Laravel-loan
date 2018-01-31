<template>
    <el-container direction="vertical">
        <v-head></v-head>
        <el-container>
            <v-sidebar></v-sidebar>
            <el-main>
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import vHead from './Header.vue'
    import vSidebar from './Sidebar.vue'

    export default {
        components: {
            vHead,
            vSidebar
        }
    }
</script>

<style scoped>
    .el-main {
        position: absolute;
        left: 200px;
        right: 0;
        top: 70px;
        bottom: 0;
        width: auto;
        padding: 40px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
</style>
