<template>
    <div class="container">
        <div class="row">
            <table>
        <thead>
          <tr>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Gambar</th>
          </tr>
        </thead>

        <tbody v-if="products.length !== 0">
          <tr  v-for="(product,index) in products" :key="index">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.price}}/{{product.satuan}}</td>
            <td>{{product.stock}}</td>
            <td><img :src="require(`../../../server/public/products/${product.image}`)"/></td>            
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td>empty</td>
            <td>empty</td>
            <td>empty</td>
            <td>empty</td>
            <td>empty</td>            
          </tr>
        </tbody>
      </table>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            products: []
        }
    },
    created () {
        this.fetchProduct()
    },
    methods: {
        fetchProduct() {
            let userId = this.$route.params.userId
            axios.get(`http://localhost:3000/product/all/${userId}`)
              .then(data => {
                  this.products = data.data
              })
              .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
  img {
    height: 100px;
    width: 100px
  }
</style>
