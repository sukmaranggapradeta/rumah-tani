<template>
  <div class="container">
    <div v-if="loading" class>
      <Loading />
    </div>

    <div v-if="form_add_page && !loading" class="container">
      <form @submit.prevent="add_product" class="col s12 m10 l10 offset-m1 offset-l1">
        <div class="container CheckoutProgess">
          <div>
            <div class="progess-circle progess-circle-left">
              <i class="material-icons">check</i>
            </div>
          </div>
          <hr class="LineProgess" />
          <div>
            <div class="progess-circle progess-circle-mid">2</div>
          </div>
          <hr class="LineProgess" />

          <div>
            <div class="progess-circle progess-circle-right">3</div>
          </div>
        </div>
        <div class="progresText">
          <div>Persiapan</div>
          <div>Mulai Tanam</div>
          <div>Panen</div>
        </div>
        <div class="row">
          <div id="inputtop" class="center">
            <div class="input-field col s6">
              <input
                v-model="product_name"
                ref="product_name"
                id="icon_prefix"
                type="text"
                class="validate"
              />
              <label for="icon_prefix">Nama Tanaman</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s6">
              <input type="date" v-model="tanam" id="textarea1" class="materialize-textarea" />
              <label for="textarea1">Mulai Tanam</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s6">
              <input type="text" v-model="produksi" id="textarea1" class="materialize-textarea" />
              <label for="textarea1">Jumlah Produksi</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s6">
              <input type="date" v-model="panen" id="textarea1" class="materialize-textarea" />
              <label for="textarea1">Perkiraan Panen</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s6">
              <input type="text" v-model="lahan" id="textarea1" class="materialize-textarea" />
              <label for="textarea1">Luas Lahan</label>
            </div>
          </div>
          <!-- <div class="center">
            <div class="input-field col s5">
              <input type="date" v-model="panen" id="textarea1" class="materialize-textarea" />
              <label for="textarea1">Perkiraan Panen</label>
            </div>
          </div>-->
        </div>

        <div id="buttonaddproduct" class="center">
          <button
            v-if="!edit_mode"
            class="btn waves-effect waves-light grey darken-3"
            type="submit"
            name="action"
          >
            SIMPAN DATA
            <i class="material-icons right">add</i>
          </button>
        </div>
        <!-- <div v-if="edit_mode" class="center row">
          <div class="col">
            <button class="btn waves-effect waves-light" type="submit" name="action">
              BATAL
              <i class="material-icons left">settings_backup_restore</i>
            </button>
          </div>
          <div class="col">
            <button class="btn waves-effect waves-light" type="submit" name="action">
              SUNTING PRODUK
              <i class="material-icons right">edit</i>
            </button>
          </div>
        </div>-->
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import myServer from "../../api/myServer.js";
import Loading from "../../components/Loading";

export default {
  props: ["edit_mode", "product_name_selected"],
  components: {
    Loading
  },
  data() {
    return {
      loading: false,
      form_add_page: true,
      product_name: "",
      lahan: "",
      tanam: "",
      panen: "",
      produksi: ""
    };
  },
  methods: {
    add_product() {
      console.log("userId", localStorage.getItem("id"));
      this.loading = true;
      this.form_add_page = false;
      if (this.product_name === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Nama Tanaman tidak boleh kosong`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.lahan === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Luas lahan tidak boleh kosong`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.tanam === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Jumlah produksi tidak boleh kosong`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.panen === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Perkiraan panen tidak boleh kosong`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.produksi === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Kemampuan produksi image`
        });
        this.loading = false;
        this.form_add_page = true;
      } else {
        myServer
          .post("/product/" + localStorage.getItem("id"), {
            name: this.product_name,
            description: this.product_description,
            image: data.filename,
            price: this.product_price,
            satuan: this.product_type,
            stock: this.product_stock
          })
          .then(({ data }) => {
            Swal.fire({
              position: "center",
              type: "success",
              title: `${data.name} success added`,
              showConfirmButton: false,
              timer: 2500
            });
            this.loading = false;
            this.form_add_page = true;
            this.product_name = "";
            this.product_description = "";
            this.product_image = "";
            this.product_price = "";
            this.product_type = "";
            this.product_stock = "";
            this.file = "";
            this.urlTemp = "";
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
            this.loading = false;
            this.form_add_page = true;
          });
      }
    }
  }
};
</script>

<style>
.progresText {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-family: Lato;
  /* font-size: 11px; */
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  color: #27356a;
}
.LineProgess {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  border: solid 3px #e6e6e6;
  background-color: #ffffff;
  margin: 0;
  opacity: 0.8;
  width: 35.505vw;
}
.CheckoutProgess {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 50px;
}
.progess-circle {
  width: 32px;
  height: 32px;
  border: solid 3px #e1c268;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}

.progess-circle-right {
  background-color: #ffffff;
}

.progess-circle-mid {
  background-color: #e1c268;
  color: #ffffff;
}
.progess-circle-left {
  background-color: #7ac70c;
  color: #ffffff;
  border: solid 3px #7ac70c;
  font-size: 18px;
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
</style>