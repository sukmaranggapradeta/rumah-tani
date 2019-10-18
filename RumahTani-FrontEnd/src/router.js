import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Register.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      children: [
        {
          path: 'farmer',
          name: 'dashboard-farmer',
          component: () => import(/* webpackChunkName: "dashboard-farmer" */ './components/FarmerList.vue'),
        },
        {
          path: 'customers',
          name: 'dashboard-customers',
          component: () => import(/* webpackChunkName: "dashboard-customers" */ './components/CustomerList.vue'),
        },
      ]
    },
  ]
});
