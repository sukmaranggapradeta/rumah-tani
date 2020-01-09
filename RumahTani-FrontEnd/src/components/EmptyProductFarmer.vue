<template>
  <div class="box-notfound">
    <!-- <h1>404 NOT FOUND</h1> -->
    <img
      class="notfound"
      src="../assets/qonto-empty-state-illustration-search-no-result-tom-souverain.gif"
      alt
    />
    <h6>Nothing to see here...</h6>
    <router-link to="/">
      <button class="btn grey darken-4">Add product</button>
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
@media only screen and (max-width: 768px) {
  .box-notfound {
    margin: 20px auto;
  }
  .notfound {
    width: 90%;
  }
}
</style>