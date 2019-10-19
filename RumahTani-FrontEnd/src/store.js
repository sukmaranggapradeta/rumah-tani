import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    isCustomer: false,
    isFarmer: false,
    userName: "",
    countCart: 1,
    notifCustomer: 0,
    notifAdmin: 0
  },
  mutations: {
    userLogin(state) {
      state.isLogin = true;
      state.userName = localStorage.getItem("name");
      if (localStorage.getItem("role") === "admin") {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
      if (localStorage.getItem("role") === "customer") {
        state.isCustomer = true;
      }
      if (localStorage.getItem("role") === "farmer") {
        state.isFarmer = true;
      }
    },
    userLogout(state) {
      state.isLogin = false;
      state.isAdmin = false;
      state.isCustomer = false;
      state.isFarmer = false;
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
    },
    setupCountCart(state, payload) {
      state.countCart = payload;
    },
    plusCountCart(state) {
      state.countCart++;
    },
    minCountCart(state) {
      state.countCart--;
    },
    plusNotifCust(state) {
      state.notifCustomer++;
    },
    resetNotifCust(state) {
      state.notifCustomer = 0;
    },
    addnotifAdmin(state) {
      state.notifAdmin++;
    },
    resetCountCart(state) {
      state.countCart = 0;
    }
  },
  actions: {}
});
