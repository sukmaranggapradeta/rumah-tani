<template>
    <div class="dashboard">
        <div class="row">
            <div class="col l2 #9e9e9e grey">
                <div class="collection">
                    <a @click="showFarmerList" class="collection-item" :class="{active: isFarmerActive}">Farmer</a>
                    <a @click="showCostumerList" class="collection-item" :class="{active: isCustomerActive}">Costumers</a>
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
  data () {
      return {
          isFarmerActive: false,
          isCustomerActive: false
      }
  },
  methods: {
      showCostumerList() {
          this.isFarmerActive = false
          this.isCustomerActive = true
          this.$router.push('/dashboard/customers')
      },
      showFarmerList() {
          this.isFarmerActive = true
          this.isCustomerActive = false
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
.row {
    margin-bottom: 0
}
.l2 {
height: 80vh;
}
</style>
