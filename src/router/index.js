import Vue from 'vue'
import Router from 'vue-router'

import JinjuList from '@/pages/JinjuList'
import TabbarNav from '@/pages/TabbarNav'
import NavBar from '@/pages/NavBar'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/main/JinjuList'
        },

        {
            path: '/main',
            name: 'main',
            component: NavBar,
            children: [
                {
                    path: 'JinjuList',
                    name: 'JinjuList',
                    component: JinjuList
                }
            ]
        },

        {
            path: '/home',
            name: 'JinjuList',
            component: JinjuList
        },

    ]
})
