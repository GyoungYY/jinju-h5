import Vue from 'vue'
import Router from 'vue-router'

import JinjuList from '@/pages/JinjuList'
import NavBar from '@/pages/NavBar'
import MyList from '@/pages/MyList'

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
                },
                {
                    path: 'MyList',
                    name: 'MyList',
                    component: MyList
                },
            ]
        },

    ]
})
