<template>
    <div>
        <router-view class="content-body"></router-view>
        <div class="footer">
            <span class="footer-span">首页</span>
            <span class="footer-span">我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .content-body{
        margin-bottom:50px;
    }
    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        display: flex;
    }

    .footer-span {
        display: inline-block;
        width: 50%;
        padding: 10px;
        text-align: center;
        font-size: 16px;
        background-color: #fff;
    }
</style>
