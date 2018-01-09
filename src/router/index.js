import Vue from 'vue'
import Router from 'vue-router'

import JinjuList from '@/pages/JinjuList'
import TabbarNav from '@/pages/TabbarNav'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },

        {
            path: '/home',
            name: 'JinjuList',
            component: JinjuList
        },
    
    ]
})
