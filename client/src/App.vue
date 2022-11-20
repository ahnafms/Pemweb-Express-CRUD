<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <p style="font-size: 40px; padding-top: 200px">{{ get }}</p>
    </div>
    <div>INPUT</div>
    <input type="text" placeholder="isi nama" v-model="this.nama" />
    <input type="text" placeholder="isi email" v-model="this.email" />
    <input
      type="text"
      placeholder="isi tempat lahir"
      v-model="this.tempat_lahir"
    />
    <button @click="postMethod()">Submit</button>
    <div style="padding-top:40px; display:flex;" v-for="(karyawan, index) in karyawans">
      <div style="width:50%">
        <div>{{ karyawan.nama }}</div>
        <div>{{ karyawan.email }}</div>
        <div>{{ karyawan.tempat_lahir }}</div>
        <button @click="deleteKaryawan(karyawan.id)">delete</button>
      </div>
      <div>
        <input type="text" placeholder="nama" v-model="newName">
        <input type="text" placeholder="email" v-model="newEmail">
        <input type="text" placeholder="tempat lahir" v-model="newTempatLahir">
        <button @click="updateKaryawan(karyawan.id, newName, newEmail, newTempatLahir)">update</button>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  data() {
    return {
      nama: "",
      email: "",
      tempat_lahir: "",
      karyawans: [],
    };
  },
  methods: {
    async getMethod() {
      try {
        const res = await axios.get("http://localhost:8000/api/karyawan");
        this.karyawans.push(...res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async postMethod() {
      console.log(this.nama, this.email, this.tempat_lahir);
      await axios
        .post("http://localhost:8000/api/post", {
          nama: this.nama,
          email: this.email,
          tempat_lahir: this.tempat_lahir,
        })
        .then((response) => {
          console.log(response);
        })
    },
    async deleteKaryawan(id){
      await axios.delete(`http://localhost:8000/api/karyawan/${id}`)
      .then((response)=>{
        console.log(response)
        const index = this.karyawans.findIndex((k)=>{
         return k.id == id
        })
        if(index == -1) return;
        this.karyawans.splice(index, 1)
      })
    },
    async updateKaryawan(id, nama, email, tempat_lahir){
      await axios.put(`http://localhost:8000/api/karyawan/${id}`,{
        nama:nama,
        email:email,
        tempat_lahir:tempat_lahir
      })
      .then((response) => {
        console.log(response)
      })
    }
  },
  mounted() {
    this.getMethod();
  },
};
</script>
