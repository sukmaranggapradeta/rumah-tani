<template>
    <div class="dashboard">
        <div class="row">
            <div class="col l2">
                <div class="collection">
                    <a @click="showFarmerList" class="collection-item">Farmer</a>
                    <a @click="showCostumerList" class="collection-item">Costumers</a>
                    <a href="#!" class="collection-item">Transactions</a>
                </div>
            </div>
            <div class="col l10">
                <router-view> </router-view>
            </div>
        </div>
    </div>
</template>

<script>
 // @ is an alias to /src

export default {
  name: "home",
  methods: {
      showCostumerList() {
          this.$router.push('/dashboard/customers')
      },
      showFarmerList() {
          this.$router.push('/dashboard/farmer')
      },
  }
};
</script>

<style scoped>
.box-home {
  margin: 3vw auto;
}
img {
  width: 100%;
}
p {
  font-family: "Dosis", sans-serif;
  font-size: 18px;
}
</style>
