<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
        <p style="font-size: 40px; padding-top:200px">{{ get }}</p>
    </div>
  </header>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default{
  data(){
    return{
      get: ''
    }
  },
  methods:{
    async getMethod(){
      try{
        await axios.get("http://localhost:8000/get")
        .then((response)=>{
        this.get = response.data
        })
      }
      catch(err){
        console.log(err)
      }
    }
  },
  mounted(){
    this.getMethod()
  }
}
</script>
