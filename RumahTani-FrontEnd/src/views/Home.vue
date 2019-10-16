<template>
  <div class="home">
    <div class="row container box-home">
      <div class="col s12 m6 l6">
        <img :src="require('@/assets/farmer.png')" alt="home" />
      </div>
      <div class="col s12 m6 l6">
        <h3>Welcome to RumahTani</h3>
        <p>
          RumahTani berawal dari sebuah mimpi bahwa suatu hari, para petani Indonesia dapat menikmati hasil yang adil untuk segala kerja keras mereka di ladang, sementara setiap rumah tangga dapat menikmati produk pertanian lokal dengan harga terjangkau.
          Kami terus bekerja dan berusaha untuk menciptakan terobosan besar di sektor yang sebelumnya bisa dikatakan sangat tersegmentasi, misterius dan selalu diremehkan. Tentunya perjalanan kami tidak mudah dan penuh perlawanan, namun kami percaya bahwa setiap usaha keras demi cita-cita yang mulia akan selalu sepadan.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import farmerImage from "../assets/bibit.png";

export default {
  name: "home"
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
