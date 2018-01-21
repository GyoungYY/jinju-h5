import Vue from 'vue'
import Router from 'vue-router'

import NavBar from '@/pages/NavBar'
import MyList from '@/pages/MyList'

import JinjuList from '@/pages/JinjuList'
import JinjuDetail from '@/pages/JinjuDetail'

import UserPage from '@/pages/UserPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index/JinjuList'
        },

        {
            path: '/index',
            name: 'index',
            component: NavBar,
            children: [
                {
                    path: 'JinjuList',
                    name: 'JinjuList',
                    component: JinjuList
                },
                {
                    path: 'JinjuDetail/:id',
                    name : 'JinjuDetail',
                    component: JinjuDetail
                },
                {
                    path: 'MyList',
                    name: 'MyList',
                    component: MyList
                },
                {
                    path: 'UserPage/:id',
                    name : 'UserPage',
                    component: UserPage
                },
            ]
        },

    ]
})
