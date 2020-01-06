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
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/Profile.vue")
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
      path: "/myproducts",
      name: "myproducts",
      component: () =>
        import(/* webpackChunkName: "myproducts" */ "./views/MyProducts.vue")
    },
    {
      path: "/carts",
      name: "carts",
      component: () =>
        import(/* webpackChunkName: "carts" */ "./views/buyer/Cart.vue")
    },
    {
      path: "/mytransaction",
      name: "mytransaction",
      component: () =>
        import(
          /* webpackChunkName: "transactions" */ "./views/buyer/Transaction.vue"
        )
    },
    {
      path: "/myStore",
      name: "myStore",
      component: () =>
        import(
          /* webpackChunkName: "transactions" */ "./views/farmer/MyStore.vue"
        )
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      children: [
        {
          path: "/",
          name: "dashboard-home",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-home" */ "./components/LandingPage.vue"
            )
        },
        {
          path: "customer",
          name: "dashboard-customer",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-customer" */ "./components/CustomerList.vue"
            )
        },
        {
          path: "farmerTransaction",
          name: "dashboard-farmerTransaction",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-farmerTransaction" */ "./views/farmer/FarmerTransaction.vue"
            )
        },
        {
          path: "customerTransaction",
          name: "dashboard-customerTransaction",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-customerTransaction" */ "./views/buyer/CustomerTransaction.vue"
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
        },
        {
          path: "productList/:userId",
          name: "dashboard-productList",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-productList" */ "./components/ProductList.vue"
            )
        },
        {
          path: "detailTransaction/:transactionId",
          name: "dashboard-detailTransaction",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-detailTransaction" */ "./components/DetailTransaction.vue"
            )
        },
        {
          path: "transaction",
          name: "dashboard-transactionList",
          component: () =>
            import(
              /* webpackChunkName: "dashboard-transactionList" */ "./components/TransactionList.vue"
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
