// router.js

import VueRouter from 'vue-router';
import Vue from 'vue';
// Import your components
import Home from '/views/Home.vue';
import Dieren from '/views/Dieren.vue';
import Services from "/views/Services.vue";
import Inlog from "../views/Inlog.vue";
import Profile from "../views/Profile.vue";

// Use Vue Router
Vue.use(VueRouter);
// Define routes
const routes = [
    { path: '/', component: Home, },
    {
        path: '/dieren',
        name: 'Dieren',
        component: Dieren,
        props: route => ({
            order: parseInt(route.query.order) || 0,
            limit: parseInt(route.query.limit) || 0,
            offset: parseInt(route.query.offset) || 0,
            overige: (route.query.overige) || null,
        })
    },
    {path: '/services', component: Services},
    {path: '/inloggen', component: Inlog},
    {path: '/profile', component: Profile},
];

// Create router instance
const router = new VueRouter({
    mode: 'history', // This sets the router mode to use HTML5 History API
    routes
});

// Export router instance
export default router;