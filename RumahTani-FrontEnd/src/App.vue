<template>
  <div id="app">
    <NavBar />
    <router-view
      :myCarts="myCarts"
      :total="total"
      @remove_quantity="remove_quantity"
      @add_quantity="add_quantity"
      @delete_cart="delete_cart"
      @add_to_cart="add_to_cart"
      @resetMyCarts="resetMyCarts"
      @fetchDataCarts="fetchDataCarts"
    />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Swal from "sweetalert2";
import myServer from "./api/myServer.js";

export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      myCarts: [],
      total: null
    };
  },
  methods: {
    add_to_cart(payload) {
      myServer
        .get(`/cart/all/${localStorage.getItem("id")}`)
        .then(({ data }) => {
          let isOnCart = false;
          let idCart;
          let beforeQuantity = 0;
          if (data !== null) {
            data.forEach(element => {
              if (element.productId._id === payload.productId) {
                isOnCart = true;
                idCart = element._id;
                beforeQuantity = element.quantity;
              }
            });
          }
          if (isOnCart) {
            myServer
              .put(`/cart/${idCart}`, {
                quantity: beforeQuantity + 1
              })
              .then(({ data }) => {
                M.toast({ html: `${payload.productName} added to cart` });
              })
              .catch(err => {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: `${err.response}`
                });
              });
          } else {
            myServer
              .post("/cart", {
                productId: payload.productId,
                quantity: 1,
                userId: localStorage.getItem("id")
              })
              .then(({ data }) => {
                this.$store.commit("plusCountCart");
                this.myCarts.push(data);
                M.toast({ html: `${payload.productName} added to cart` });
              })
              .catch(err => {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: `${err}`
                });
              });
          }
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err}`
          });
        });
    },
    delete_cart(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Remove this product from your cart!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
      }).then(result => {
        if (result.value) {
          myServer
            .delete(`/carts/${id}`, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(({ data }) => {
              this.total -= data.quantity * data.product.price;
              this.$store.commit("minCountCart");
              this.myCarts = this.myCarts.filter(el => {
                if (el._id !== data._id) {
                  return el;
                }
              });
              Swal.fire({
                position: "center",
                type: "success",
                title: "Product removing",
                showConfirmButton: false,
                timer: 1500
              });
            })
            .catch(err => {
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: `${err.response.data.msg}`
              });
            });
        }
      });
    },
    add_quantity(payload) {
      myServer
        .put(
          `/carts/${payload.id}`,
          {
            quantity: payload.beforeQuantity + 1
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          let myCartsTemp = this.myCarts;
          myCartsTemp.map(el => {
            if (el._id === data._id) {
              this.total += el.product.price;
              el.quantity = data.quantity;
            }
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    remove_quantity(payload) {
      if (payload.beforeQuantity <= 1) {
        this.delete_cart(payload.id);
      } else {
        myServer
          .put(
            `/carts/${payload.id}`,
            {
              quantity: payload.beforeQuantity - 1
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            let myCartsTemp = this.myCarts;
            myCartsTemp.map(el => {
              if (el._id === data._id) {
                this.total -= el.product.price;
                el.quantity = data.quantity;
              }
            });
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data}`
            });
          });
      }
    },
    resetMyCarts() {
      this.myCarts = [];
      this.total = null;
    },
    fetchDataCarts() {
      myServer
        .get("/cart/all/" + localStorage.getItem("id"))
        .then(({ data }) => {
          this.total = null;
          this.myCarts = data;
          this.$store.commit("setupCountCart", this.myCarts.length);
          this.myCarts.forEach(el => {
            this.total += el.product.price * el.quantity;
          });
        })
        .catch(err => {
        });
    }
  },
  created() {
    if (localStorage.getItem("role")) {
      this.fetchDataCarts();
    } else {
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
