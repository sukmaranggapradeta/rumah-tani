<template>
  <div class="box-notfound">
    <div class="box-empty">
      <img class="notfound" src="../assets/empty_cart_800x600_dribbble.png" alt />
    </div>
    <!-- <h6>Nothing to see here...</h6> -->
    <router-link to="/products">
      <button class="btn grey darken-4">Belanja sekarang</button>
    </router-link>
  </div>
</template>

<style scoped>
.box-notfound {
  margin: 40px auto;
}
.notfound {
  width: 35%;
}
.box-empty img {
  margin-top: -160px;
  height: 500px;
  width: 600px;
}
@media only screen and (max-width: 768px) {
  .box-notfound {
    margin: 20px auto;
  }
  .notfound {
    width: 90%;
  }
}
</style>