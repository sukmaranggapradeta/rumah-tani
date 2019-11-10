<template>
  <div class="box-transaction container">
    <div class="row">
      <div class="col m8 l8 s12 border-box box-carts">
        <div v-if="isEmpty">
          <EmptyCart />
        </div>
        <CardCart
          v-for="cart in carts"
          :key="cart.id"
          :cart="cart"
          @delete_selected_cart="delete_selected_cart"
          @rupiah="rupiah"
          @fecthDataCart="fecthDataCart"
        />
      </div>
      <div class="col m4 l4 s12 border-box">
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
              <div class="col m12 l12 s12 btn tokped">Beli({{countCart}})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myServer from "../../api/myServer.js";
import Loading from "../../components/Loading";
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

  components: {
    CardCart,
    Loading
  },
  data() {
    return {
      carts: [],
      isLoading: true
    };
  },
  methods: {
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

    fecthDataPayment() {
      this.isLoading = true;
      //   myServer
      //     .get("/cart/all/" + localStorage.getItem("id"))
      //     .then(({ data }) => {
      //       if (data.length <= 0) {
      //         this.isEmpty = true;
      //         this.carts = [];
      //         this.isLoading = false;
      //       } else {
      //         this.isLoading = false;
      //         this.carts = data;
      //         data.forEach(element => {
      //           console.log(element.productId.price, element.quantity);
      //           this.totalPrice += element.productId.price * element.quantity;
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       Swal.fire({
      //         type: "error",
      //         title: "Oops...",
      //         text: `${err.response.data}`
      //       });
      //     });
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
@media only screen and (max-width: 768px) {
}
</style>