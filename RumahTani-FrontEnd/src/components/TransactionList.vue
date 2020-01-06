<template>
    <div class="container">
        <div class="row">
            <h3>DAFTAR TRANSAKSI</h3>
            <hr>
            <div id="container">
                <div style="display: flex; justify-content: space-around; background-color: rgb(231, 237, 243)">
                    <h5>Invoice</h5>
                    <h5>Tanggal</h5>
                </div>
                <div style="display: flex; justify-content: space-around; padding-top: 1rem">
                    <div style="display: flex; flex-direction: column;">
                        <span @click="getDetailTransaction(transaction._id)" style="margin-bottom: 1rem" v-for="(transaction,index) in transactionList" :key="index" class="name" >(INV/{{new Date().getFullYear()}}/{{(transaction._id).toUpperCase()}})</span>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <span style="margin-bottom: 1rem" v-for="(transaction,index) in transactionList" :key="index">{{transaction.createdAt | '2019-10-03 14:02:22' | moment("dddd, MMMM Do YYYY")}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'dashboard-transactionList',
    data() {
        return {
            transactionList: []
        }
    },
    created() {
        this.fetchTransactions()
    },
    methods: {
        fetchTransactions() {
            axios.get(`http://localhost:3000/transactions`)
              .then(({data}) => {
                  this.transactionList = data
              })
              .catch(err => console.log(err))
        },
        getDetailTransaction(id) {
            this.$router.push(`/dashboard/detailTransaction/${id}`)
        }
    }
}
</script>

<style scoped>
#container {
    -webkit-box-shadow: 0px 6px 36px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 6px 36px -5px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 9px 2px rgb(172, 172, 172)
}
.material-icons {
    cursor: pointer;
}
.lastTd {
    display: flex;
    justify-content: space-around
}
.actionTh {
    text-align: center
}
.edit:hover {
    color: blue
}
.delete:hover {
    color: red
}
.validate {
    width: 150px !important;
}
.row{
    min-height: 70vh;
}
.name:hover {
    cursor: pointer;
    color: #0505b896;
    text-decoration-line: underline
}
h3 {
    font-weight: bold;
}
.name {
    color: #0000ff96
}
thead {
    background-color: #f4f4f4
}
table {
    -webkit-box-shadow: 0px 6px 36px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 6px 36px -5px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 9px 2px rgb(172, 172, 172)
}
th {
    text-align: center;
}
</style>