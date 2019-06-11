import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Register from "./views/Register.vue";
import notfound from "./views/404.vue";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Infoshow from "./views/Infoshow.vue";
import fundlist from "./views/FundList.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "*",
      name: "/404",
      component: notfound
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      children: [
        { path: "", component: Home },
        { path: "/home", name: "home", component: Home },
        { path: "/infoshow", name: "infoshow", component: Infoshow },
        { path: "/fundlist", name: "fundlist", component: fundlist }
      ]
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.LanToken ? true : false;
  if (to.path == "/" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/");
  }
});
export default router;
