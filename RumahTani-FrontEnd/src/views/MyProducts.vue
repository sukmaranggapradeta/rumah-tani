<template>
  <div class="container box-products">
    <div class="row">
      <div>
        <div class="center">
          <router-view></router-view>
        </div>
        <div v-if="!isLoading">
          <FormEditProduct
            class="center"
            v-if="edit_mode"
            :edit_mode="edit_mode"
            :data_edit="data_edit"
            @cancel_edit="cancel_edit"
            @update_data_after_edit="update_data_after_edit"
          ></FormEditProduct>

          <MyProductCard
            v-else
            v-for="product in products"
            :key="product.id"
            :product="product"
            @delete_product="delete_product"
            @update_product="update_product"
            @trigger_edit_page="trigger_edit_page"
            @add_to_cart="add_to_cart"
          ></MyProductCard>
        </div>

        <div v-if="isLoading">
          <Loading />
        </div>
        <div v-if="isEmpty">
          <EmptySpace />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import MyProductCard from "../components/MyProductCard";
import FormEditProduct from "../components/FormEditProduct";
import myServer from "../api/myServer.js";
import Loading from "../components/Loading";
import EmptySpace from "../components/Empty";

// import { truncate } from 'fs'

export default {
  components: {
    MyProductCard,
    FormEditProduct,
    Loading,
    EmptySpace
  },
  data() {
    return {
      products: [],
      edit_mode: false,
      data_edit: "",
      isLoading: true,
      isEmpty: false
    };
  },
  methods: {
    add_to_cart(payload) {
      this.$emit("add_to_cart", payload);
    },
    update_data_after_edit(data) {
      this.products = this.products.map(el => {
        if (el._id === data._id) {
          el.name = data.name;
          el.description = data.description;
          el.price = data.price;
          el.image = data.image;
          el.stock = data.stock;
        }
        return el;
      });
      this.edit_mode = false;
    },
    cancel_edit() {
      this.edit_mode = false;
    },
    trigger_edit_page(productId) {
      this.edit_mode = true;
      this.products.forEach(el => {
        if (el._id === productId) {
          this.data_edit = el;
        }
      });
    },
    fetchDataProducts() {
      myServer
        .get("/product/all/" + localStorage.getItem("id"))
        .then(({ data }) => {
          if (data.length <= 0) {
            this.isLoading = false;
            this.isEmpty = true;
          } else {
            this.products = data;
            this.isLoading = false;
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
    delete_product(deletedId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          myServer
            .delete(`/product/${deletedId}`)
            .then(deleted => {
              this.products = this.products.filter(el => {
                if (el._id !== deletedId) {
                  return el;
                }
              });
              Swal.fire({
                position: "center",
                type: "success",
                title: "Product deleted",
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
    update_product(id) {
      myServer
        .put(`/products/id`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(updated => {
          Swal.fire({
            position: "center",
            type: "success",
            title: "content updated",
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
  },
  created() {
    if (localStorage.getItem("role") !== null) {
      this.fetchDataProducts();
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.box-products {
  margin: 40px auto;
}
</style>
