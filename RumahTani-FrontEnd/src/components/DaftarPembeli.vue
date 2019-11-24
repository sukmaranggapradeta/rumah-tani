<template>
  <div class="container border box-daftar-belanja">
    <div class="row border-bottom">
      <div
        class="col s12 m12 l12 box-daftar-belanja-tanggal"
      >{{formatTanggal(transction.tanggalPemesanan)}}</div>
    </div>
    <div class="row border-bottom">
      <div class="col s12 m5 l5">
        <div class="row">
          <div
            class="col s12 m12 l12 nama-toko flex-kiri"
          >{{(transction.namaPemesan).toUpperCase()}}</div>
          <div
            class="col s12 m12 l12 flex-kiri"
          >(INV/{{new Date().getFullYear()}}/{{(transction.noInvoice).toUpperCase()}})</div>
        </div>
      </div>
      <div class="col s6 m5 l5">
        <div class="row border-left">
          <div class="col s12 m12 l12 flex-kiri">Status</div>
          <div class="col s12 m12 l12 status-pesanan flex-kiri">{{transction.status}}</div>
        </div>
      </div>
      <div class="col s6 m2 l2">
        <div class="row border-left">
          <div class="col s12 m12 l12 flex-kiri">Total Belanja</div>
          <div
            class="col s12 m12 l12 warna-harga font-harga-total flex-kiri"
          >Rp {{rupiah(transction.totalHarga)}}</div>
        </div>
      </div>
    </div>
    <!-- <div v-for="(cart, index) in transction.carts" :key="index"> -->
    <div class="row border-bottom">
      <div class="col s12 m5 l5">
        <div class="row margin-box">
          <div class="col s6 m2 l2 flex-center">
            <div class="row daftar-belanja-img">
              <img class :src="require(`../../../server/public/products/${transction.gambar}`)" alt />
            </div>
          </div>
          <div class="col s6 m9 l9">
            <div class="row">
              <div class="col s12 m12 l12 nama-toko flex-kiri">{{transction.barang}}</div>
              <div class="col s12 m12 l12 flex-kiri warna-harga">
                Rp {{rupiah(transction.hargaBarang)}}
                <span
                  class="warna-span"
                >{{transction.totalPesananan}} {{transction.satuan}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!buktiTransfer" class="flex-kiri link-show-image" @click="showBuktiTransfer()">
          Lihat Bukti Transfer
          <i class="material-icons">arrow_drop_down</i>
        </div>
        <div v-if="buktiTransfer" class="flex-kiri link-show-image" @click="hideBuktiTransfer()">
          Sembuyikan Bukti Transfer
          <i class="material-icons">arrow_drop_up</i>
        </div>
      </div>
      <div class="col s12 m7 l7">
        <div class="row border-left">
          <div class="col s12 m12 l12 flex-kiri status-pesanan">Alamat</div>
          <div class="col s12 m12 l12 flex-kiri">{{transction.dataPenerima.nama}}</div>
          <div class="col s12 m12 l12 flex-kiri">{{transction.dataPenerima.alamat}}</div>
          <div class="col s12 m12 l12 flex-kiri">{{transction.dataPenerima.telp}}</div>
          <!-- <div class="col s12 m12 l12 flex-kiri">{{transction.buktiPembayaran}}</div> -->
        </div>
      </div>
      <div class="col s12 m12 l12 box-bukti-transfer" v-if="buktiTransfer">
        <img
          class
          :src="require(`../../../server/public/products/${transction.buktiPembayaran}`)"
          alt
        />
      </div>
    </div>
    <!-- </div> -->
    <!-- {{transction}} -->
  </div>
</template>

<script>
export default {
  props: ["transction"],
  data() {
    return {
      buktiTransfer: false
    };
  },
  methods: {
    showBuktiTransfer() {
      this.buktiTransfer = true;
    },
    hideBuktiTransfer() {
      this.buktiTransfer = false;
    },
    formatTanggal(value) {
      let tanggal = new Date(value).getDate();
      let bulan = new Date(value).getMonth();
      let tahun = new Date(value).getFullYear();
      let namaBulan = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des"
      ];
      return tanggal + " " + namaBulan[bulan] + " " + tahun;
    },
    rupiah(value) {
      // console.log("rupiah parent trigger", value);

      let newString = String(value);
      let count = 0;
      let ubah = "";
      for (let i = newString.length - 1; i >= 0; i--) {
        if (count === 3) {
          ubah = "." + ubah;
          count = 0;
        }
        ubah = newString[i] + ubah;
        count++;
      }
      // console.log(ubah, "hasilnya");
      return ubah;
    }
  }
};
</script>

<style  scoped>
.link-show-image {
  cursor: pointer;
  text-decoration: underline;
}
.box-bukti-transfer img {
  width: 100%;
}
.border {
  /* border: 1px solid grey; */
  color: rgba(0, 0, 0, 0.68);
  box-shadow: rgba(49, 53, 59, 0.52) 1px 2px 6px 0px;
  border-radius: 10px;
}

.border-bottom {
  border-bottom: 1px solid rgb(241, 241, 241);
}
.border-left {
  border-left: 2px solid rgb(241, 241, 241);
}
.box-daftar-belanja {
  margin-bottom: 40px;
}
.margin-box {
  margin: auto;
}
.box-daftar-belanja-tanggal {
  /* margin: 10px; */
  padding: 10px;
  display: flex !important;
  justify-content: flex-start;
}
.nama-toko {
  color: rgb(66, 181, 73);
  font-size: 0.857143rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}
.status-pesanan {
  font-weight: bold;
  color: black;
}
.warna-harga {
  color: rgb(250, 89, 29);
}
.font-harga-total {
  font-weight: bold;
}
.flex-kiri {
  display: flex;
  justify-content: flex-start;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.daftar-belanja-img {
  /* width: 56px; */
  /* height: 56px; */
  padding-left: 10px;
}
.daftar-belanja-img img {
  object-fit: cover;
  width: 56px;
  height: 56px;
  border-radius: 10px;
}
.warna-span {
  color: grey;
  padding-left: 12px;
}
/* .garis-daftar-belanja {
  overflow: auto !important;
  /* color: rgba(0, 0, 0, 0.68); */
/* box-shadow: rgba(49, 53, 59, 0.52) 0px 0px 6px 0px; */
</style>