<template>
    <div>
        <!-- <div class="header">
            <span class="el-icon-arrow-left" @click="goBack()">返回</span>
        </div> -->
        <router-view class="content-body"></router-view>
        <div class="footer">
            <div class="footer-span" :class="{'active-tab': $store.state.activeName === 'JinjuList'}" @click="clickTab('JinjuList')">
                <span class="glyphicon glyphicon-home" style="display: block;padding-bottom:4px;"></span>
                <span style="font-size:12px;">首页</span>
            </div>
            <div class="footer-span" :class="{'active-tab': $store.state.activeName === 'articleList'}" @click="clickTab('articleList')">
                <span class="glyphicon glyphicon-list-alt" style="display: block;padding-bottom:4px;"></span>
                <span style="font-size:12px;">美文</span>
            </div>
            <div class="footer-span" :class="{'active-tab': $store.state.activeName === 'chat'}" @click="clickTab('articleList')">
                <span class="glyphicon glyphicon-envelope" style="display: block;padding-bottom:4px;"></span>
                <span style="font-size:12px;">消息</span>
            </div>
            <div class="footer-span" :class="{'active-tab': $store.state.activeName === 'MyList'}" @click="clickTab('MyList')">
                <span class="glyphicon glyphicon-user" style="display: block;padding-bottom:4px;"></span>
                <span style="font-size:12px;">我的</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
            }
        },

        methods: {

            //切换底部tab
            clickTab(key) {
                this.$store.commit('changeTab',key);
                this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                if (key === 'JinjuList') {
                    this.$router.push({path: '/index/JinjuList'});
                } else if (key === 'MyList' && this.userInfo) {
                    this.$router.push({path: '/index/MyList'});
                } else if (key === 'MyList' && !this.userInfo) {
                    this.$router.push({path: '/index/Login'});
                } else if(key === 'articleList'){
                    this.$router.push({path: '/index/articleList'});
                }
            },

            //返回
            goBack() {
                history.go(-1);
            }
        },

    }
</script>

<style scoped>
    .header {
        padding: 10px;
        width: 100%;
        background-color: #545c64;
        color: #fff;
        font-size: 16px;
        margin-bottom: 4px;
    }

    .content-body {
        margin-bottom: 60px;
    }

    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        display: flex;
        background-color: #545c64;
        color: #fff;
    }

    .footer-span {
        display: inline-block;
        width: 25%;
        padding: 6px;
        text-align: center;
        font-size: 16px;
    }

    .active-tab {
        color: #f90;
    }
</style>
