<template>
    <div class="container">
        <div class="row">
            <h3>Costumer</h3>
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
                    <tr v-for="(customer,index) in customerList" :key="index">
                        <td v-if="index !== indexEditUser"><span>{{customer.name}}</span></td>
                        <td v-if="index === indexEditUser" class="editInput" >
                            <input v-model="newUser.name" placeholder="Placeholder" id="name" type="text" class="validate">
                        </td>
                        <td v-if="index !== indexEditUser">{{customer.email}}</td>
                        <td v-if="index === indexEditUser" class="editInput">
                            <input v-model="newUser.email" placeholder="Placeholder" id="email" type="text" class="validate">
                        </td>
                        <td>{{customer.createdAt | '2019-10-03 14:02:22' | moment("dddd, MMMM Do YYYY")}}</td>
                        <td class="lastTd">
                            <div v-if="index === indexEditUser">
                                <i @click="saveEdit(customer._id)" class="small material-icons edit">check</i> 
                                <i @click="cancelEdit(customer._id)" class="small material-icons delete">cancel</i> 
                            </div>
                            <div v-if="index !== indexEditUser">
                                <i @click="editUser(customer._id, index, customer.name, customer.email)" data-target="modal1" class="small material-icons edit">edit</i> 
                                <i @click="deleteUser(customer._id)" class="small material-icons delete">delete_forever</i> 
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
    name: 'dashboard-customerList',
    data() {
        return {
            customerList: [],
            indexEditUser: false,
            newUser: {
                name: '',
                email: ''
            }
        }
    },
    created() {
        this.fetchCustomerList()
    },
    methods: {
        fetchCustomerList() {
            axios.get(`http://localhost:3000/user/customer`)
              .then(({data}) => {
                  this.customerList = data
              })
              .catch(err => console.log(err,'err'))
        },
        deleteUser(userId) {
            axios.delete(`http://localhost:3000/user/${userId}`)
              .then(data => {
                  this.fetchCustomerList()
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
.row{
    min-height: 70vh;
}
span:hover {
    cursor: pointer;
    color:blue;
    text-decoration-line: underline
}
</style>