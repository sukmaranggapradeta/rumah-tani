<template>
  <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper green darken-4">
        <div id="logonavbar" class="left">
          <router-link to="/" class="brand-logo">
            <i class="material-icons">local_florist</i>RumahTani
          </router-link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <!-- <ul class="sidenav" id="mobile-demo">
            <li v-if="isLogin && !isAdmin">
              <a @click.prevent="logout">
                <i class="material-icons">shopping_cart</i>
              </a>
            </li>
            <li v-if="false">
              <router-link to="/orders">
                <i class="material-icons left">notifications</i>
                {{ notifCustomer }} cust
              </router-link>
            </li>
            <li v-if="false">
              <router-link to="/transactions">
                <i class="material-icons left">notifications</i>
                {{ notifAdmin }} admin
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/login">
                <i class="material-icons left">account_circle</i>Login
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/register">
                <i class="material-icons left">assignment_ind</i>Register
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link to="/transactions">
                <i class="material-icons right">face</i>
                {{ userName }}
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link id="logout_link" to="/login" @click.native="logout()">
                <i class="material-icons right">last_page</i>Logout
              </router-link>
            </li>
          </ul>-->
        </div>

        <!-- MOBILE SIDE NAVBAR -->
        <ul class="sidenav" id="mobile-demo">
          <li v-if="!isLogin">
            <router-link class="sidenav-close" to="/login">
              <i class="material-icons left">account_circle</i>Login
            </router-link>
          </li>
          <li v-if="!isLogin">
            <router-link class="sidenav-close" to="/register">
              <i class="material-icons left">assignment_ind</i>Register
            </router-link>
          </li>
          <li v-if="isLogin">
            <router-link class="sidenav-close" to="/profile">
              <i class="material-icons">face</i>
              {{ userName }}
            </router-link>
          </li>
          <li>
            <div class="divider"></div>
          </li>
          <li v-if="isLogin && isFarmer">
            <router-link class="sidenav-close" to="/addproduct">
              Add Product
              <i class="material-icons right">add_a_photo</i>
            </router-link>
          </li>
          <li v-if="isLogin && isFarmer">
            <router-link class="sidenav-close" to="/myproducts">
              My Products
              <i class="material-icons right">store</i>
            </router-link>
          </li>
          <li v-if="isLogin && isFarmer">
            <router-link class="sidenav-close" to="/mystore">
              My Store
              <i class="material-icons right">monetization_on</i>
            </router-link>
          </li>
          <li v-if="isLogin && isCustomer">
            <router-link class="sidenav-close" to="/mycarts">
              My Carts
              <i class="material-icons right">local_grocery_store</i>
            </router-link>
          </li>
          <li v-if="isLogin && isCustomer">
            <router-link class="sidenav-close" to="/products">
              Products
              <i class="material-icons right">store</i>
            </router-link>
          </li>
          <li v-if="isLogin && isCustomer">
            <router-link class="sidenav-close" to="/mytransaction">
              My Transactions
              <i class="material-icons right">chrome_reader_mode</i>
            </router-link>
          </li>

          <li v-if="isLogin">
            <router-link
              class="sidenav-close"
              id="logout_link"
              to="/login"
              @click.native="logout()"
            >
              <i class="material-icons right">last_page</i>Logout
            </router-link>
          </li>
        </ul>

        <!-- MENU TOP -->
        <div id="menunavbar" class>
          <ul class="right hide-on-med-and-down">
            <li v-if="isLogin && isFarmer">
              <router-link class="sidenav-close" to="/addproduct">
                Add Product
                <i class="material-icons right">add_a_photo</i>
              </router-link>
            </li>
            <li v-if="isLogin && isFarmer">
              <router-link class="sidenav-close" to="/myproducts">
                My Products
                <i class="material-icons right">store</i>
              </router-link>
            </li>
            <li v-if="isLogin && isFarmer">
              <router-link class="sidenav-close" to="/mystore">
                My Store
                <i class="material-icons right">monetization_on</i>
              </router-link>
            </li>
            <li v-if="isLogin && isCustomer">
              <router-link class="sidenav-close" to="/products">
                Products
                <i class="material-icons right">store</i>
              </router-link>
            </li>

            <li v-if="isLogin && isCustomer">
              <router-link to="/carts">
                My Carts
                <i class="material-icons right">shopping_cart</i>
                {{ countCart }}
              </router-link>
            </li>
            <li v-if="isLogin && isCustomer">
              <router-link class="sidenav-close" to="/mytransaction">
                My Transactions
                <i class="material-icons right">chrome_reader_mode</i>
              </router-link>
            </li>

            <li v-if="false">
              <router-link to="/orders">
                <i class="material-icons left">notifications</i>
                {{ notifCustomer }} cust
              </router-link>
            </li>
            <li v-if="false">
              <router-link to="/transactions">
                <i class="material-icons left">notifications</i>
                {{ notifAdmin }} admin
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/login">
                <i class="material-icons left">account_circle</i>Login
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/register">
                <i class="material-icons left">assignment_ind</i>Register
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link to="/profile">
                <i class="material-icons right">face</i>
                {{ userName }}
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link id="logout_link" to="/login" @click.native="logout()">
                <i class="material-icons right">last_page</i>Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState([
      "isLogin",
      "isAdmin",
      "isFarmer",
      "isCustomer",
      "userName",
      "countCart",
      "notifCustomer",
      "notifAdmin"
    ])
  },
  methods: {
    logout() {
      this.$store.commit("userLogout");
    }
  }
};
</script>

<style scoped>
li {
  font-family: "Fira Sans Extra Condensed", sans-serif;
}
.brand-logo {
  font-family: "Oleo Script Swash Caps", cursive;
}
#logonavbar {
  margin-left: 40px;
}
#menunavbar {
  margin-right: 40px;
}
:root {
  --mainColor: #ff9800;
}

/* body {
  align-items: center;
  display: flex;
  font-family: "Montserrat", sans-serif;
  font-size: 2em;
  height: 100vh;
  justify-content: center;
} */

a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>
<style>
.sidenav-overlay {
  z-index: 995 !important;
}
</style>
