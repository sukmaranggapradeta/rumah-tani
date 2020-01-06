<template>
  <div style="margin: 5rem" class="container">
      <div class="dateBar" style="display: flex; justify-content: start; padding: 5px; border-bottom: 1px solid #d2cccc">
          {{detail.createdAt | '2019-10-03 14:02:22' | moment("dddd, MMMM Do YYYY")}}
      </div>
      <div class="header" style="display: flex; padding: 5px; border-bottom: 1px solid #d2cccc">
          <div style="display: flex; flex-direction: column; width: 40%; justify-content: center">
              <span>(INV/{{new Date().getFullYear()}}/{{(detail._id).toUpperCase()}})</span>
              <div>
                  <span>Pembeli : </span> <span style="font-weight: bold; color: green">{{detail.carts[0].username}}</span>
              </div>
          </div>
          <div style="display: flex; flex-direction: column; width: 35%; align-items: start">
              <span>status</span>
              <span style="font-weight: bold">{{detail.status}}</span>
          </div>
          <div style="display: flex; flex-direction: column; width: 25%">
              <span>Total Belanja</span>
              <span style="font-weight: bold; color: red">Rp.{{detail.totalPrice}}</span>
          </div>
      </div>
      <div v-for="(cart, index) in detail.carts" :key="index" class="body" style="display: flex; padding: 5px; border-bottom: 1px solid #d2cccc">
          <div style="display: flex; width: 40%">
            <div>
                <img
                :src="require(`../../../server/public/products/${cart && cart.products && cart.products.image}`)" 
                style="width: 200px; height: 100px"
                />
            </div>
            <div style="display: flex; flex-direction: column">
                <span>{{cart.products.name}}</span>
                <div style="display: flex; justify-content: space-between">
                    <span>Rp.{{cart.products.price}} | </span>
                    <span>{{cart.quantity}} ({{cart.products.satuan}})</span>
                </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; width: 35%">
              <span>Total Harga Produk</span>
              <span style="color: red">Rp.{{cart.quantity * cart.products.price}}</span>
          </div>
          <div style="display: flex; flex-direction: column; width: 25%">
                <span>Penjual</span> 
                <span style="font-weight: bold; color: green">{{cart.penjual}}</span>
          </div>
      </div>
      <div class="footer" style="display: flex; flex-direction: column">
          <span style="font-weight: bold">Tujuan Pengiriman</span>
          <span>Nama Penerima: {{detail.receiverData.nama}}</span>
          <span>Alamat Penerima: {{detail.receiverData.alamat}}</span>
          <span>No.Telepon Penerima: {{detail.receiverData.telp}}</span>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            detail: []
        }
    },
    created(){
        this.fetchDetailTransaction()
    },
    methods: {
        fetchDetailTransaction() {
            let id = this.$route.params.transactionId
            axios.get(`http://localhost:3000/transactionOne/${id}`)
              .then(({data}) => {
                  console.log(data,'data')
                  this.detail = data
              })
              .catch(err => console.log(err))
        }
    },
};
</script>

<style  scoped>
.container {
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
}
</style>