<template>
  <div class="col s6 m6 l4">
    <div class="card hoverable">
      <div class="card-image">
        <img
          :src="product.image ? product.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7kD200qOiwwDrwuDcHP_VFeXZBXmbgJfTQuzaINW_CK9z3L70'"
        />
        <!-- <h1 class="card-title">{{ product.name }}</h1> -->
        <span
          v-if="!isAdmin"
          @click="add_to_cart(product._id)"
          class="btn-floating halfway-fab waves-effect waves-light red"
        >
          <i class="material-icons">add_shopping_cart</i>
        </span>
      </div>
      <div class="card-content">
        <!-- {{product}} -->
        <span>{{ product.name }}</span>

        <h6>IDR {{ product.price ? rupiah(product.price) : 0 }}</h6>
        <span>{{ product.description }}</span>
      </div>
      <div v-if="isAdmin" class="card-action">
        <div class="row s12 m12 l12">
          <span @click="trigger_edit_page(product._id)" class="btn orange lighten-2 small">
            <i class="material-icons left">edit</i>EDIT
          </span>
        </div>
        <div class="row s12 m12 l12">
          <span @click="delete_product(product._id)" class="btn red darken-1 small">
            <i class="material-icons right">delete_forever</i>DELETE
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["product"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["isAdmin", "isCustomer", "isFarmer"])
  },
  methods: {
    // show_detail(id) {
    //   // console.log('show_detail', id)
    //   this.$router.push(`/products/${id}`);
    // },
    add_to_cart(productId) {
      console.log("add_to_cart trigger", productId);
      this.$emit("add_to_cart", productId);
    },
    delete_product(id) {
      this.$emit("delete_product", id);
    },
    trigger_edit_page(id) {
      this.$emit("trigger_edit_page", id);
    },
    rupiah(value) {
      // console.log('rupiah trigger', value)
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
    }
  }
};
</script>

<style scoped>
h4,
span,
h6 {
  font-family: "B612 Mono", monospace;
}
.card-image img {
  max-height: 100%;
}
img {
  cursor: pointer;
}
.footerimage {
  font-size: 10px;
}
</style>
