<template>
    <div class="container">
        <h3>Farmer</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined At</th>
                    <th class="actionTh">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(farmer,index) in farmerList" :key="index">
                    <td>{{farmer.name}}</td>
                    <td>{{farmer.email}}</td>
                    <td>{{farmer.createdAt}}</td>
                    <td class="lastTd"> 
                        <i class="small material-icons delete">delete_forever</i> 
                        <i class="small material-icons edit">edit</i> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'dashboard-farmerlist',
    data() {
        return {
            farmerList: []
        }
    },
    created() {
        this.fetchFarmeList()
    },
    methods: {
        fetchFarmeList() {
            axios.get(`http://localhost:3000/user/customer`)
              .then(({data}) => {
                  this.farmerList = data
              })
              .catch(err => console.log(err,'err'))
        }
    }
}
</script>

<style>
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
</style>