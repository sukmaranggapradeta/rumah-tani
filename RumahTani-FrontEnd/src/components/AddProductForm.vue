<template>
  <div class="card">
    <div v-if="loading" class>
      <Loading />
      <!-- <div class="progress">
        <div class="indeterminate"></div>
      </div>
      <h1>L.O.A.D.I.N.G.</h1>
      <img src="../assets/loading-flower.svg" alt />-->
    </div>
    <div v-if="form_add_page && !loading" class="container">
      <form @submit.prevent="add_product" class="col s12 m10 l10 offset-m1 offset-l1">
        <div class="row">
          <div id="inputtop" class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">N</i>
              <input
                v-model="product_name"
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
              <i class="material-icons prefix">D</i>
              <textarea v-model="product_description" id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Deskripsi</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">P</i>
                  <input v-model="product_price" id="product_price" type="number" class="validate" />
                  <label for="product_price">Harga</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">S</i>
                  <input v-model="product_stock" id="product_stock" type="number" class="validate" />
                  <label for="product_stock">Stok</label>
                </div>
              </div>
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">S</i>
                  <input v-model="product_type" id="product_type" type="text" class="validate" />
                  <label for="product_type">Satuan</label>
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
                <span>Gambar</span>
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
          <button
            v-if="!edit_mode"
            class="btn waves-effect waves-light grey darken-3"
            type="submit"
            name="action"
          >
            TAMBAH PRODUK
            <i class="material-icons right">add</i>
          </button>
        </div>
        <div v-if="edit_mode" class="center row">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import myServer from "../api/myServer.js";
import Loading from "../components/Loading";

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
      product_description: "",
      product_image: "",
      product_price: "",
      product_type: "",
      product_stock: "",
      file: "",
      urlTemp: ""
    };
  },
  methods: {
    add_product() {
      this.loading = true;
      this.form_add_page = false;
      if (this.product_name === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill product name`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.product_description === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill product description`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.product_price === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill product price`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.product_stock === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please fill product stock`
        });
        this.loading = false;
        this.form_add_page = true;
      } else if (this.file === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Please select product image`
        });
        this.loading = false;
        this.form_add_page = true;
      } else {
        let formData = new FormData();
        formData.append("image", this.file);
        myServer
          .post(`/products/image/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            return myServer
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
                this.$router.push('/myproducts')
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
          });
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      const file = this.$refs.file.files[0];
      this.urlTemp = URL.createObjectURL(file);
    }
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
</style>
