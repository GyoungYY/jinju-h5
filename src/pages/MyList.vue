<template>
    <div>
        <div class="photo-div">
            <img src="../../static/img/photo0.jpeg" alt="" class="my-photo">
        </div>
        <mt-cell title="个人信息"></mt-cell>
        <mt-cell title="发表金句"></mt-cell>
        <mt-cell title="退出登录"></mt-cell>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        methods: {}
    }
</script>

<style scoped>
    .photo-div {
        text-align: center;
        padding: 20px;
        background-color: #fff;
    }

    .my-photo {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 1px solid #ddd;
    }
</style>
