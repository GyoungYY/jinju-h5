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
        /* background-color: #cf9; */
        /* background-color: #fff; */
        background-color: #e8e8e8 !important;
    }
</style>
