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
          class="btn-floating halfway-fab waves-effect waves-light red hide-on-small-and-down"
        >
          <i class="material-icons">add_shopping_cart</i>
        </span>
      </div>
      <div class="card-content">
        <!-- {{ product}} -->
        <span class="h6-product">{{ product.name }}</span>

        <h6
          class="h6-product"
        >Rp {{ product.price ? rupiah(product.price) +"/" + product.satuan : 0 }}</h6>
        <span class="text-product">{{ product.description }}</span>
      </div>
      <div class="card-action flex-action hide-on-med-and-up">
        <!-- <span @click="trigger_edit_page(product._id)" class="btn grey border darken-2 small">
          <i class="material-icons left">edit</i>EDIT
        </span>-->
        <span
          @click="add_to_cart(product._id, product.name)"
          class="btn grey darken-3 small shopingCart"
        >
          <i class="material-icons">add_shopping_cart</i>BUY
        </span>
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
      console.log(
        "add_to_cart trigger dr product card",
        productId,
        productName
      );
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
  height: 310px;
}
.card-image img {
  height: 200px;
  object-fit: cover;
}
.card-content {
  padding: 5px;
}
.footerimage {
  font-size: 10px;
}
@media only screen and (max-width: 768px) {
  .flex-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-content: center; */
    /* align-items: center;
     */
    /* text-align: center; */
  }
  .shopingCart {
    display: inline-flex;
    justify-content: center;
  }
  .card-action {
    padding: 0;
  }
  .card-action span {
    margin-bottom: 2px;
  }
  .card-content {
    padding: 2px;
  }
  .box-sayur {
    height: 200px;
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
