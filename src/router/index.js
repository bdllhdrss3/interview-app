import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/home",
            name: "home",
            component: () => import("../views/home/Index.vue")
        },
         {
            path: "/",
            redirect: '/home'
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/auth/LogIn.vue")
        },
        {
            path: "/Signup",
            name: "signup",
            component: () => import("../views/auth/SignUp.vue")
        },
    ]
})
