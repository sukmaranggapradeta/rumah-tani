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
      console.log("dari APP", payload.productId, payload.productName);
      myServer
        .get(`/cart/all/${localStorage.getItem("id")}`)
        .then(({ data }) => {
          console.log("data awal", data);
          let isOnCart = false;
          let idCart;
          let beforeQuantity = 0;
          if (data !== null) {
            data.forEach(element => {
              console.log("element", element);
              if (element.productId._id === payload.productId) {
                isOnCart = true;
                idCart = element._id;
                beforeQuantity = element.quantity;
              }
            });
          }
          if (isOnCart) {
            console.log("masuk if cart sudah ada");
            myServer
              .put(`/cart/${idCart}`, {
                quantity: beforeQuantity + 1
              })
              .then(({ data }) => {
                console.log("data", data);
                console.log("myCart", this.myCarts);
                // let myCartsTemp = this.myCarts;
                // myCartsTemp.map(el => {
                //   if (el._id === data._id) {
                //     this.total += el.product.price;
                //     el.quantity = data.quantity;
                //   }
                // });
                M.toast({ html: `${payload.productName} added to cart` });
                // console.log(data)
              })
              .catch(err => {
                console.log("err 3");
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: `${err.response.data}`
                });
              });
          } else {
            console.log("masuk else cart blum ada");
            myServer
              .post("/cart", {
                productId: payload.productId,
                quantity: 1,
                userId: localStorage.getItem("id")
              })
              .then(({ data }) => {
                console.log(data, " baruuu");
                this.$store.commit("plusCountCart");
                this.myCarts.push(data);
                // this.total += data.product.price;
                M.toast({ html: `${payload.productName} added to cart` });
              })
              .catch(err => {
                // console.log(err)
                console.log("err 4");
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: `${err}`
                });
              });
          }
        })
        .catch(err => {
          // console.log(err)
          console.log("err 5");
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err}`
          });
        });
    },
    delete_cart(id) {
      console.log("err 6");
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
              console.log("err 7");
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
      // console.log('add quantity myCart', payload.id)
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
          console.log("err 1");
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
            console.log("err 2");
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
          console.log(this.myCarts.length, "ini length cart");
          console.log("data user cart", data);
          this.$store.commit("setupCountCart", this.myCarts.length);
          this.myCarts.forEach(el => {
            this.total += el.product.price * el.quantity;
          });
        })
        .catch(err => {
          console.log("MASUK ERR", err.response);
          // if (err) {
          //   this.logout();
          //   this.$router.push("/login");
          // } else {
          //   Swal.fire({
          //     type: "error",
          //     title: "Oops...",
          //     text: `${err}`
          //   });
          // }
        });
    }
  },
  created() {
    if (localStorage.getItem("role")) {
      this.$store.commit("userLogin");
      // this.isLogin = true
      // this.fetchDatas()
      this.fetchDataCarts();
    } else {
      this.logout();
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
