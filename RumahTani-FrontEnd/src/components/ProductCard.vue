<template>
  <div class="col s6 m4 l3">
    <div class="card hoverable box-sayur">
      <div class="card-image">
        <!-- INI TAK BISA -->
        <img :src="require(`../../../server/public/products/${product.image}`)" alt />
        <!-- <img :src="imageLocal" alt /> -->

        <!-- INI BISA -->
        <!-- <img src="../../../server/public/products/image-1571543040368.jpg" alt /> -->

        <!-- <img :src="require(`../../../server/public/products/${product.image}`)" alt /> -->
        <!-- <img :src="imageLocal" alt /> -->
        <!-- <img
          :src="product.image ? `../../../server/public/products/${product.image}`  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7kD200qOiwwDrwuDcHP_VFeXZBXmbgJfTQuzaINW_CK9z3L70'"
        />-->
        <!-- <h1 class="card-title">{{ product.name }}</h1> -->
        <span
          v-if="!isAdmin"
          @click="add_to_cart(product._id, product.name)"
          class="btn-floating halfway-fab waves-effect waves-light red"
        >
          <i class="material-icons">add_shopping_cart</i>
        </span>
      </div>
      <div class="card-content">
        <span class="h6-product">{{ product.name }}</span>

        <h6 class="h6-product">IDR {{ product.price ? rupiah(product.price) +"/kg" : 0 }}</h6>
        <span class="text-product">{{ product.description }}</span>
      </div>
      <div v-if="isFarmer" class="card-action">
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
    add_to_cart(productId, productName) {
      console.log("add_to_cart trigger", productId, productName);
      this.$emit("add_to_cart", { productId, productName });
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
.box-sayur {
  height: 340px;
}
.card-image img {
  height: 200px;
  object-fit: cover;
}
img {
  /* cursor: pointer; */
  /* height: 100%; */
}
.footerimage {
  font-size: 10px;
}
@media only screen and (max-width: 768px) {
  .box-sayur {
    height: 220px;
  }
  .card-image img {
    height: 100px;
  }
  .text-product {
    font-size: 10px;
  }
  .h6-product {
    font-size: 12px;
  }
}
</style>
