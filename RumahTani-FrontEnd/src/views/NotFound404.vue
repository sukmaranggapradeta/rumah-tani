<template>
  <div class="box-notfound">
    <!-- <h1>404 NOT FOUND</h1> -->
    <img class="notfound" src="../assets/404-spacer.gif" alt />
    <h6>Looks like you are lost in space</h6>
    <button class="btn grey darken-4">back to Home</button>
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