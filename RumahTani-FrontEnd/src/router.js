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
          path: 'customer',
          name: 'dashboard-customer',
          component: () => import(/* webpackChunkName: "dashboard-customer" */ './components/CustomerList.vue'),
        },
        {
          path: 'producer',
          name: 'dashboard-producer',
          component: () => import(/* webpackChunkName: "dashboard-producer" */ './components/ProducerList.vue'),
        }
      ]
    },
  ]
});
