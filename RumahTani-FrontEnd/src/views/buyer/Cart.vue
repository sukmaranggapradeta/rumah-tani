<template>
  <div class="box-transaction container">
    <div class="row">
      <div class="col m8 l8 s12 border-box box-carts">
        <div v-if="isEmpty && !isPayment && !isLoading">
          <EmptyCart />
        </div>
        <div v-if="!isPayment">
          <CardCart
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
            @delete_selected_cart="delete_selected_cart"
            @rupiah="rupiah"
            @fecthDataCart="fecthDataCart"
          />
        </div>
      </div>
      <div v-if="!isPayment && !isLoading" class="col m4 l4 s12 border-box">
        <div class="card">
          <div class="row">
            <div class="col m12 l12 s12">
              <div class="ringkasan-title title-cart">Ringkasan Belanja</div>
            </div>
            <div class="col m12 l12 s12">
              <div class="row box-total-harga">
                <div class="col m6 l6 s6">Total Harga</div>
                <div class="col m6 l6 s6">Rp. {{isEmpty ? 0 : rupiah(totalPrice)}}</div>
              </div>
            </div>
            <div class="col m12 l12 s12 btn-beli">
              <div @click="beliBtn" class="col m12 l12 s12 btn tokped">Beli({{countCart}})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-if="isPayment && !isLoading">
      <PaymentForm :buyerCart="carts" :totalPrice="totalPrice" />
    </div>
  </div>
</template>

<script>
import myServer from "../../api/myServer.js";
import Loading from "../../components/Loading";
import CardCart from "../../components/CardCart.vue";
import EmptyCart from "../../components/EmptyCart";
import { mapState } from "vuex";
import PaymentForm from "../../components/Payment";
import Swal from "sweetalert2";

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

  components: {
    CardCart,
    EmptyCart,
    PaymentForm,
    Loading
  },
  data() {
    return {
      carts: [],
      isLoading: true,
      isEmpty: false,
      isPayment: false,
      totalPrice: 0
    };
  },
  methods: {
    beliBtn() {
      console.log("beli");
      console.log(this.carts);
      this.isPayment = true;
    },
    rupiah(value) {
      // console.log("rupiah parent trigger", value);
      let newString = String(value);
      let count = 0;
      let ubah = "";
      for (let i = newString.length - 1; i >= 0; i--) {
        if (count === 3) {
          ubah = "." + ubah;
          count = 0;
        }
        ubah = newString[i] + ubah;
        count++;
      }
      // console.log(ubah, "hasilnya");
      return ubah;
    },

    fecthDataCart() {
      console.log("masukfecthDataCart ");
      this.isLoading = true;
      this.totalPrice = 0;
      myServer
        .get("/cart/all/" + localStorage.getItem("id"))
        .then(({ data }) => {
          if (data.length <= 0) {
            this.isEmpty = true;
            this.carts = [];
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.carts = data;
            data.forEach(element => {
              console.log(element.productId.price, element.quantity);
              this.totalPrice += element.productId.price * element.quantity;
            });
          }
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    delete_selected_cart(selectedCart) {
      console.log("delete ini ", selectedCart);
      myServer
        .delete("/cart/" + selectedCart)
        .then(({ data }) => {
          console.log("ini delete", data);
          this.fecthDataCart();
          this.$store.commit("minCountCart");
        })
        .catch(err => {
          console.log("err delete carts");
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    }
  },
  created() {
    if (localStorage.getItem("role") === null) {
      this.$router.push("/login");
    }
    this.fecthDataCart();
  }
};
</script>


<style scoped>
.box-transaction {
  margin-top: 40px;
  margin-bottom: 80px;
  min-height: 50vh;
}
.box-carts {
  /* border-top: 2px solid black; */
  padding: 10px;
}
.ringkasan-title {
  border-bottom: 1px solid grey;
  margin: auto 10px;
}
.title-cart {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
}
.tokped {
  background: #fa591d;
  margin-bottom: 20px;
}
.btn-beli {
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.box-total-harga {
  margin: 20px 10px;
}
@media only screen and (max-width: 768px) {
}
</style>