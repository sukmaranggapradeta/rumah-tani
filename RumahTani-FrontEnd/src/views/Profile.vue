<template>
  <div>
      <div style="margin: 10vh 10vw; display : flex; justify-content: center">
        <div style="width: 30%">
            <div class="card">
                <div class="card-image">
                <img v-if="fotoProfile.length == 0" src="../../public/profileDefault.jpg">
                <img v-if="fotoProfile.length != 0" :src="require(`../../../server/public/products/${fotoProfile}`)">
                <a @click="uploadFile()" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">file_upload</i></a>
                </div>
                <div class="card-content" style="margin-top: 2rem">
                    <div v-if="isEditName" style="display: flex;">
                        <input v-model="username">
                        <i @click="saveEditName()" class="material-icons">check</i>
                    </div>
                    <p v-if="!isEditName" @click="editName()">{{username}} <i style="margin-left: 1rem" class="material-icons">edit</i></p>
                    
                    <div v-if="isEditEmail" style="display: flex;">
                        <input v-model="email">
                        <i @click="saveEditEmail()" class="material-icons">check</i>
                    </div>
                    <p v-if="!isEditEmail" @click="editEmail()">{{email}} <i style="margin-left: 1rem" class="material-icons">edit</i></p>
                    <div v-if="isEditPassword">
                        <input v-model="newPassword" placeholder="new password">
                        <a @click="saveEditPassword()" class="waves-effect waves-light btn">simpan kata sandi</a>
                    </div>
                    <a v-if="!isEditPassword" @click="editPassword()" class="waves-effect waves-light btn" style="margin-top: 1rem">ubah kata sandi</a>
                </div>
            </div>
        </div>
    </div>
    <input id="uploadFoto" type="file" ref="file" v-on:change="handleFileUpload()" style="visibility: hidden"/>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import myServer from '../api/myServer';

export default {
    data() {
       return {
           username: "",
           email: "",
           fotoProfile: "",
           newPassword: "",
           isEditName: false,
           isEditEmail: false,
           isEditPassword: false,
           file: "",
           urlTemp: "",
       } 
    },
    methods: {
        uploadFile(){
            document.getElementById("uploadFoto").click()
        },  
        handleFileUpload() {
            console.log("fotonya", this.$refs.file.files[0]);
            this.file = this.$refs.file.files[0];
            const file = this.$refs.file.files[0];
            this.urlTemp = URL.createObjectURL(file);
            console.log(this.urlTemp);
            let formData = new FormData();
            formData.append("image", this.file);
            myServer
                .post(`/user/image/upload`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                })
                .then(({data})=>{
                    return myServer
                        .put(`/user/${localStorage.getItem('id')}`, {
                            image : data.filename,
                        })  
                })
                .then(data => {
                    console.log(data,'user baru upload file')
                    this.fetchUserData()
                })
                .catch(err => {
                    console.log(err,'upload foto error')
                })
        },
        editName() {
            this.isEditName = true
        },
        saveEditName() {
            this.isEditName = false
            myServer
                .put(`/user/${localStorage.getItem('id')}`, {
                    name : this.username,
                })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem('name',data.name)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editEmail() {
            this.isEditEmail = true
        },
        saveEditEmail() {
            this.isEditEmail = false
            myServer
                .put(`/user/${localStorage.getItem('id')}`, {
                    email : this.email,
                })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem('email',data.email)

                })
                .catch(err => {
                    console.log(err)
                })
        },
        editPassword() {
            this.isEditPassword = true
        },
        saveEditPassword() {
            this.isEditPassword = false
            myServer
                .put(`/user/${localStorage.getItem('id')}`, {
                    password : this.newPassword,
                })
                .then(data => {
                    console.log(data)
                    Swal.fire({
                        position: "center",
                        type: "success",
                        title: `kata sandi telah diganti`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchUserData(){
            console.log('fetch user')
            myServer
                .get(`/user/profile/${localStorage.getItem('id')}`)
                .then(({data})=> {
                    this.fotoProfile = data.image
                    console.log(data,'user data fetch')
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    created() {
        this.username = localStorage.getItem('name')
        this.email = localStorage.getItem('email')
        this.fetchUserData()

    }
};
</script>

<style scoped>
img {
    height: 300px;
    width: 50px
}
i {
    cursor: pointer;
}
i:hover{
    color: rgb(59, 6, 251)
}
</style>
