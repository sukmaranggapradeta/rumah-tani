<template>
  <div class="box-transaction container">
    <div class="row">
      <h1>Pembayaran</h1>
      <form @submit.prevent="add_product" class="col s12 m10 l10 offset-m1 offset-l1">
        <div class="row">
          <div id="inputtop" class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input
                v-model="nama"
                ref="product_name"
                id="icon_prefix"
                type="text"
                class="validate"
              />
              <label for="icon_prefix">Nama</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">local_shipping</i>
              <textarea v-model="alamat" id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Alamat</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">settings_phone</i>
                  <input v-model="telp" id="product_price" type="number" class="validate" />
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
        <div id="buttonaddproduct" class="center">
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