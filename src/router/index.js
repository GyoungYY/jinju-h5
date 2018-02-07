import Vue from 'vue'
import Router from 'vue-router'

// import NavBar from '@/pages/NavBar'
// import MyList from '@/pages/MyList'
// import Login from '@/pages/Login'
//
// import JinjuList from '@/pages/JinjuList'
// import JinjuDetail from '@/pages/JinjuDetail'
//
// import UserPage from '@/pages/UserPage'
//
// import ArticleList from '@/pages/ArticleList'
// import ArticleDetail from '@/pages/ArticleDetail'
//
// import ChatRoom from '@/pages/ChatRoom'
//
// import PublishJinju from '@/pages/PublishJinju'

const NavBar = () => import('@/pages/NavBar')
const MyList = () => import('@/pages/MyList')
const Login = () => import('@/pages/Login')

const JinjuList = () => import('@/pages/JinjuList')
const JinjuDetail = () => import('@/pages/JinjuDetail')

const UserPage = () => import('@/pages/UserPage')

const ArticleList = () => import('@/pages/ArticleList')
const ArticleDetail = () => import('@/pages/ArticleDetail')

const ChatRoom = () => import('@/pages/ChatRoom')

const PublishJinju = () => import('@/pages/PublishJinju')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index/jinjuList'
        },

        {
            path: '/index',
            name: 'index',
            component: NavBar,
            children: [
                {
                    path: 'jinjuList',
                    name: 'JinjuList',
                    component: JinjuList
                },
                {
                    path: 'jinjuDetail/:id',
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
                {
                    path: 'Login',
                    name:　'Login',
                    component: Login
                },
                {
                    path: 'articleList',
                    name: 'articleList',
                    component: ArticleList
                },
                {
                    path: 'articleDetail/:id',
                    name: 'articleDetail',
                    component: ArticleDetail
                },
                {
                    path: 'chatroom',
                    name: 'chatroom',
                    component: ChatRoom
                },
                {
                    path: 'publishMain',
                    name: 'publishMain',
                    component: PublishJinju
                },
            ]
        },

    ]
})
