<template>
    <div>
        <div class="header">
            <span class="el-icon-arrow-left" @click="goBack()">返回</span>
        </div>
        <router-view class="content-body"></router-view>
        <div class="footer">
            <span class="footer-span" @click="clickTab('home')"
                  :class="{'active-tab': activeName === 'JinjuList'}">首页</span>
            <span class="footer-span" @click="clickTab('my')" :class="{'active-tab': activeName === 'MyList'}">我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabName: ['JinjuList', 'MyList',],
            }
        },

        methods: {

            //切换底部tab
            clickTab(index) {
                if (index === 'home') {
                    this.$router.push({path: '/index/JinjuList'});
                } else if (index === 'my') {
                    this.$router.push({path: '/index/MyList'});
                }
            },

            //返回
            goBack() {
                history.go(-1);
            }
        },

        computed: {
            activeName: function () {
                for (let name of this.tabName) {
                    if (this.$route.path.indexOf(name) >= 0) {
                        return name;
                    }
                }
            }
        }
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
        margin-bottom: 50px;
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
        width: 50%;
        padding: 10px;
        text-align: center;
        font-size: 16px;
    }

    .active-tab {
        color: #f90;
    }
</style>
