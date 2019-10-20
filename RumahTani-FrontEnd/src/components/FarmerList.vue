<template>
    <div class="container">
        <div class="row">
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
                        <td v-if="index !== indexEditUser">{{farmer.name}}</td>
                        <td v-if="index === indexEditUser" class="editInput" >
                            <input v-model="newUser.name" placeholder="Placeholder" id="name" type="text" class="validate">
                        </td>
                        <td v-if="index !== indexEditUser">{{farmer.email}}</td>
                        <td v-if="index === indexEditUser" class="editInput">
                            <input v-model="newUser.email" placeholder="Placeholder" id="email" type="text" class="validate">
                        </td>
                        <td>{{farmer.createdAt | '2019-10-03 14:02:22' | moment("dddd, MMMM Do YYYY")}}</td>
                        <td class="lastTd">
                            <div v-if="index === indexEditUser">
                                <i @click="saveEdit(farmer._id)" class="small material-icons edit">check</i> 
                                <i @click="cancelEdit(farmer._id)" class="small material-icons delete">cancel</i> 
                            </div>
                            <div v-if="index !== indexEditUser">
                                <i @click="editUser(farmer._id, index, farmer.name, farmer.email)" data-target="modal1" class="small material-icons edit">edit</i> 
                                <i @click="deleteUser(farmer._id)" class="small material-icons delete">delete_forever</i> 
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'dashboard-farmerlist',
    data() {
        return {
            farmerList: [],
            indexEditUser: false,
            newUser: {
                name: '',
                email: ''
            }
        }
    },
    created() {
        this.fetchFarmeList()
    },
    methods: {
        fetchFarmeList() {
            axios.get(`http://localhost:3000/user/farmer`)
              .then(({data}) => {
                  this.farmerList = data
                  this.indexEditUser = false
              })
              .catch(err => console.log(err))
        },
        deleteUser(userId) {
            axios.delete(`http://localhost:3000/user/${userId}`)
              .then(data => {
                  this.fetchFarmeList()
              })
              .catch(err => console.log(err))
        },
        editUser(userId, index, name, email) {
            this.newUser= {name, email}
            this.indexEditUser = index
            
        },
        saveEdit(userId) {
            axios.put(`http://localhost:3000/user/${userId}`, this.newUser)
              .then(data => {
                  this.newUser = {name : '', email: ''}
                  this.fetchFarmeList()
              })
              .catch(err => console.log(err))
        },
        cancelEdit(userId) {
            this.indexEditUser = false
        }
    }
}
</script>

<style scoped>
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
</style>