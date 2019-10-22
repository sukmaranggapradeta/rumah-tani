<template>
  <div class="col s6 m4 l3">
    <div class="card hoverable box-sayur">
      <!-- {{product.image}} -->
      <div class="card-image">
        <img :src="product ? require(`../../../server/public/products/${product.image}`) : ``" alt />
      </div>
      <div class="card-content">
        <!-- {{product}} -->
        <span class="h6-product">{{ product.name }}</span>

        <h6 class="h6-product">IDR {{ product.price ? rupiah(product.price) +"/kg" : 0 }}</h6>
        <span class="text-product">{{ product.description }}</span>
      </div>
      <div v-if="isFarmer" class="card-action flex-action">
        <span @click="trigger_edit_page(product._id)" class="btn grey border darken-2 small">
          <i class="material-icons left">edit</i>EDIT
        </span>
        <span @click="delete_product(product._id)" class="btn grey darken-2 small">
          <i class="material-icons right">delete_forever</i>DELETE
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
      console.log("add_to_cart trigger", productId, productName);
      this.$emit("add_to_cart", { productId, productName });
    },
    delete_product(id) {
      console.log("delete_product", id);
      this.$emit("delete_product", id);
    },
    trigger_edit_page(id) {
      console.log("trigger_edit_page dari card", id);
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
  height: 360px;
  margin-bottom: 25px;
}
.card-image img {
  height: 200px;
  object-fit: cover;
}
.footerimage {
  font-size: 10px;
}
.flex-action {
  display: flex;
  justify-content: space-around;
}
.card-content {
  padding: 5px;
}
@media only screen and (max-width: 1366px) {
  .flex-action {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
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
    height: 355px;
  }
}
@media only screen and (max-width: 768px) {
  .flex-action {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
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
    height: 250px;
  }
  .card-image img {
    height: 110px;
  }
  .text-product {
    font-size: 10px;
  }
  .h6-product {
    font-size: 12px;
  }
}
</style>
