<template>
    <div>
        <router-view></router-view>
        <div class="footer">
            <span class="footer-span">首页</span>
            <span class="footer-span">我的</span>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    }
    .footer-span{
        display: inline-block;
        width:50%;
        text-align: center;
        font-size:16px;
        background-color: #fff;
    }
</style>
