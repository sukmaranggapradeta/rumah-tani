<template>
  <div class="row border-section">
    <div class="col m12 l12 s12">
      <div class="row">
        <div class="col m2 l2 s4 border-box-image">
          <img
            :src="cart.productId.image ? require(`../../../server/public/products/${cart.productId.image}`) : ``"
            alt
          />
        </div>
        <!-- {{cart}} -->
        <div class="col m10 l10 s8 border-box">
          <div class="row box-cart-heading">
            <div class="col m12 l12 text-left title-cart">{{cart.productId.name}}</div>
            <div
              class="col m12 l12 text-left price-cart font-harga"
            >Rp. {{rupiah(cart.productId.price)}} / {{cart.productId.satuan}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col m12 l12 border-box">
      <div class="row right">
        <div class="col">
          <button @click="delete_selected_cart(cart._id)" class="btn-floating grey">
            <i class="material-icons">delete</i>
          </button>
        </div>
        <div class="col">
          <button @click="delete_quantity_cart(cart._id, cart.quantity)" class="btn-floating grey">
            <i class="material-icons">remove</i>
          </button>
        </div>
        <div class="col center">
          <input v-model="cart.quantity" maxlength="4" size="2" type="text" />
        </div>
        <div class="col">
          <button @click="add_quantity_cart(cart._id, cart.quantity)" class="btn-floating">
            <i class="material-icons">add</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myServer from "../api/myServer.js";

export default {
  props: ["cart"],
  data() {
    return {
      quantity: ""
    };
  },
  methods: {
    add_quantity_cart(cartId, quantity) {
      console.log("add quantity", cartId, quantity);
      myServer
        .put("/cart/" + cartId, {
          quantity: quantity + 1
        })
        .then(({ data }) => {
          console.log("ini update", data);
          this.fecthDataCart();
        })
        .catch(err => {
          console.log("err add quantity carts");
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    fecthDataCart() {
      this.$emit("fecthDataCart");
    },
    delete_quantity_cart(cartId, quantity) {
      if (quantity <= 1) {
        this.delete_selected_cart(cartId);
      } else {
        console.log("delete quantity", cartId, quantity);
        myServer
          .put("/cart/" + cartId, {
            quantity: 2
          })
          .then(({ data }) => {
            console.log("ini update", data);
            this.fecthDataCart();
          })
          .catch(err => {
            console.log("err add quantity carts");
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data}`
            });
          });
      }
    },
    delete_selected_cart(selectedCart) {
      // console.log("delete kok");
      this.$emit("delete_selected_cart", selectedCart);
    },
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
      // console.log(ubah, "hasilnya");
      return ubah;
    }
  }
};
</script>

<style scoped>
.border-section {
  border-bottom: 1px solid black;
}
.box-cart-heading {
  margin-bottom: 10px;
}
.border-box-image {
  width: 80px;
  height: 80px;
}
.border-box-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
  align-items: right;
}
input[type="text"] {
  font-size: 24px;
  text-align: center;
}
.title-cart {
  font-size: 24px;
  font-weight: bold;
}
.price-cart {
  font-size: 18px;
}
.font-harga {
  color: #fa591d;
  font-weight: bold;
}
@media only screen and (max-width: 768px) {
}
</style>