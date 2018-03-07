<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        margin: 0 auto;
        color: #000;
        background-color: #e8e8e8 !important;
    }

    img{
        max-width: 100%;
    }

    .ql-align-center{
        text-align: center;
    }

    #cnzz_stat_icon_1273048110{
        display: none;
    }
</style>
