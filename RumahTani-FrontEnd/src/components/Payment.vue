<template>
  <div class="box-transaction container">
    <div class="row">
      <h1 class="h1-margin">Pembayaran</h1>
      <form @submit.prevent="submitPayment" class="col s12 m10 l10 offset-m1 offset-l1">
        <div class="row">
          <div id="inputtop" class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input v-model="nama" ref="nama" id="icon_prefix" type="text" class="validate" />
              <label for="icon_prefix">Nama</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">local_shipping</i>
              <input
                ref="alamat"
                v-model="alamat"
                id="icon_prefix_alamat"
                type="text"
                class="validate"
              />
              <label for="icon_prefix_alamat">Alamat</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">settings_phone</i>
                  <input v-model="telp" ref="telp" id="product_price" type="text" class="validate" />
                  <label for="product_price">No Hp</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col l6 m6">
            <div class="file-field input-field">
              <div class="btn grey darken-3">
                <i class="material-icons right">image</i>
                <span>UPLOAD</span>
                <input type="file" ref="file" v-on:change="handleFileUpload()" />
              </div>
              <div class>
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div class="col l6 m6">
            <div class="center edit-image">
              <img id="imagetemp" :src="urlTemp" alt />
            </div>
          </div>
        </div>
        <!-- {{totalPrice}} -->
        <!-- {{buyerCart}} -->
        <div id="buttonaddproduct" class="center">
          <!-- <button class="btn waves-effect waves-light grey darken-3" type="submit" name="action">
            SUBMIT
            <i class="material-icons right">send</i>
          </button>-->

          <button class="btn waves-effect waves-light grey darken-3" type="submit" name="action">
            SUBMIT
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import myServer from "../api/myServer.js";
import Loading from "../components/Loading";
import { mapState } from "vuex";
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
    Loading
  },
  props: ["buyerCart", "totalPrice"],
  data() {
    return {
      carts: [],
      isLoading: true,
      nama: "",
      alamat: "",
      telp: "",
      urlTemp: "",
      file: ""
    };
  },
  methods: {
    submitPayment() {
      if (this.nama === "") {
        this.$refs.nama.focus();
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Masukkan nama penerima`
        });
      } else if (this.alamat === "") {
        this.$refs.alamat.focus();
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Masukkan alamat`
        });
      } else if (this.telp === "") {
        this.$refs.telp.focus();
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Masukkan telp`
        });
      } else if (this.file === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Silahkan unggah bukti pembayaran`
        });
      } else {
        console.log(this.totalPrice);
        // console.log(this.buyerCart);
        let paymentCart = [];
        this.buyerCart.forEach(element => {
          let objectCart = {
            userId: element.userId._id,
            productId: element.productId._id,
            quantity: element.quantity
          };
          paymentCart.push(objectCart);
        });
        console.log(paymentCart);
        let formData = new FormData();
        formData.append("image", this.file);
        myServer
          .post(`/products/image/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            console.log("data dari upload", data, data.filename);
            return myServer
              .post("/transaction/" + localStorage.getItem("id"), {
                totalPrice: this.totalPrice,
                carts: paymentCart
              })
              .then(({ data }) => {
                Swal.fire({
                  position: "center",
                  type: "success",
                  title: `Payment success`,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.isLoading = false;
                this.nama = true;
                this.alamat = "";
                this.telp = "";
                this.file = "";
                this.urlTemp = "";
                this.$store.commit("resetCountCart");
                this.$router.push("/mytransaction");
              })
              .catch(err => {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: `${err.response.data.message}`
                });
                this.loading = false;
              });
          });
      }
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
    handleFileUpload() {
      console.log("fotonya", this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
      const file = this.$refs.file.files[0];
      this.urlTemp = URL.createObjectURL(file);
      console.log(this.urlTemp);
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
    this.fecthDataPayment();
  }
};
</script>


<style scoped>
.h1-margin {
  margin: 0px auto;
}
.edit-image {
  max-width: 300px;
}
#buttonaddproduct {
  padding: 20px;
}
#inputtop {
  padding-top: 20px;
}
#imagetemp {
  height: 100%;
  width: 100%;
}
@media only screen and (max-width: 768px) {
}
</style>