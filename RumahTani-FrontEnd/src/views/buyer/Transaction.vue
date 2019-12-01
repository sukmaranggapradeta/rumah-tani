<template>
  <div class="box-transaction">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-if="isEmpty && !isLoading">
      <EmptyCart />
    </div>
    <DaftarBelanja
      v-else
      v-for="transction in transctions"
      :transction="transction"
      :key="transction.id"
    ></DaftarBelanja>
  </div>
</template>

<script>
import myServer from "../../api/myServer.js";
import Loading from "../../components/Loading";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import EmptyProductFarmer from "../../components/Empty";
import DaftarBelanja from "../../components/DaftarBelanja";

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

  components: { EmptyCart, DaftarBelanja, Loading },
  data() {
    return {
      transctions: [],
      isLoading: true,
      isEmpty: false
    };
  },
  methods: {
    rupiah(value) {
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
      return ubah;
    },

    fecthDataTransaction() {
      console.log(
        "masuk fetch data transaction",
        localStorage.getItem("role"),
        localStorage.getItem("id")
      );
      this.isLoading = true;
      myServer
        .get(
          `/transaction/all/${localStorage.getItem(
            "role"
          )}/${localStorage.getItem("id")}`
        )
        .then(({ data }) => {
          console.log(data, "ini datanya ===============");
          if (data.length > 0) {
            this.isLoading = false;
            this.transctions = data;
          } else {
            this.isEmpty = true;
            this.isLoading = false;
            // setInterval(function showLoading() {
            //   clearInterval(showLoading);
            // }, 3000);
          }
        })
        .catch(err => {
          console.log("masuk error");
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    }
  },
  created() {
    this.fecthDataTransaction();
  }
};
</script>


<style scoped>
.box-transaction {
  margin: 50px auto;
}
@media only screen and (max-width: 768px) {
}
</style>