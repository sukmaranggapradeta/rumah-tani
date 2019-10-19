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
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },

    {
      path: "/addproduct",
      name: "addproduct",
      component: () =>
        import(/* webpackChunkName: "addproduct" */ "./views/AddProduct.vue")
    },
    {
      path: "/products",
      name: "products",
      component: () =>
        import(/* webpackChunkName: "products" */ "./views/Products.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      children: [
        {
          path: "customer",
          name: "dashboard-customer",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-customer" */ "./components/CustomerList.vue"
            )
        },
        // {
        //   path: "producer",
        //   name: "dashboard-producer",
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "dashboard-producer" */ "./components/ProducerList.vue"
        //     )
        // },
        {
          path: "farmer",
          name: "dashboard-farmer",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-farmer" */ "./components/FarmerList.vue"
            )
        },
        {
          path: "customers",
          name: "dashboard-customers",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-customers" */ "./components/CustomerList.vue"
            )
        }
      ]
    },
    {
      path: "/*",
      name: "*",
      component: () =>
        import(/* webpackChunkName: "addproduct" */ "./views/NotFound404.vue")
    }
  ]
});
