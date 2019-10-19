<template>
  <div class="container box-create">
    <FormAddProduct class="center"></FormAddProduct>
  </div>
</template>

<script>
import FormAddProduct from "../components/AddProductForm";
export default {
  components: {
    FormAddProduct
  },
  created() {
    if (localStorage.getItem("role") === null) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.box-create {
  margin: 40px auto;
}
@media only screen and (max-width: 768px) {
  .box-create {
    margin: 20px auto;
  }
}
</style>