// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/*********性能优化**************
 * 【1】进行vue-router路由组件懒加载
 *
 * 【2】引入jquery和bootstrap cdn文件：注释main.js中import，再index.html文件中引入
 * 【3】引入element-ui/lib/theme-chalk/index.css cdn文件：同上
 * 【4】引入vue和element-ui cdn文件：注释main.js中import element-ui、其他所有地方import vue
 ******************************/

// import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'

import store from './common/js/storeState'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
