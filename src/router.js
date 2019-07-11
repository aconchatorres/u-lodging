import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import LoginRegister from './components/LoginRegister.vue'
import UserProfile from './components/UserProfile.vue'
import PensionDetails from './components/PensionDetails.vue'
import NewPension from './components/NewPension.vue'
import PensionReservations from './components/PensionReservations.vue'
import Search from './components/Search.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/userProfile',
            name: 'UserProfile',
            component: UserProfile
        },
        {
            path: '/pensionDetails',
            name: 'pensionDetails',
            component: PensionDetails
        },
        {
            path: '/newPension',
            name: 'newPension',
            component: NewPension
        },
        {
            path: '/loginRegister',
            name: '/loginRegister',
            component: LoginRegister
        },
        {
            path: '/pensionReservations',
            name: 'pensionReservations',
            component: PensionReservations
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
    ]
})