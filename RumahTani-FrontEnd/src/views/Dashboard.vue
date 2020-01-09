<template>
    <div class="dashboard">
        <div class="row">
            <div class="col l2 #9e9e9e grey">
                <div class="collection">
                    <a @click="showFarmerList" class="collection-item" :class="{active: isFarmerActive}">Petani</a>
                    <a @click="showCostumerList" class="collection-item" :class="{active: isCustomerActive}">Pembeli</a>
                    <a @click="showTransactionList" class="collection-item" :class="{active: isTransactionActive}">Transaksi</a>
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
          isCustomerActive: false,
          isTransactionActive: false
      }
  },
  created (){
      if(localStorage.getItem('role') !== 'admin'){
          this.$router.push('/')
      }
  },
  methods: {
      showCostumerList() {
          this.isFarmerActive = false
          this.isCustomerActive = true
          this.isTransactionActive = false
          this.$router.push('/dashboard/customers')
      },
      showFarmerList() {
          this.isFarmerActive = true
          this.isCustomerActive = false
          this.isTransactionActive = false
          this.$router.push('/dashboard/farmer')
      },
      showTransactionList(){
          this.isFarmerActive = false
          this.isCustomerActive = false
          this.isTransactionActive = true
          this.$router.push('/dashboard/transaction')
      }
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
a {
    cursor: pointer;
}
</style>
