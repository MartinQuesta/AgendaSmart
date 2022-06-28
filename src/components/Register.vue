<template>
  <div>
      <h2>Registrar</h2>

      <form class="formulario" @submit.prevent="register">

  
        <!-- ID: <input type="number" v-model="newTarea._id"><br> -->
        <ul>
          <li> Email: <input placeholder="email" type="email" v-model="user.email"></li>
          <li>Contraseña: <input placeholder="password" type="password" v-model="user.password"></li>
          <li>Nombre: <input placeholder="nombre y apellido" type="text" id='priority' v-model="user.nombre"></li>
          <li>Edad: <input placeholder="edad" type="number" id='priority' v-model="user.edad"></li>
        </ul>
        <!-- <input type="range" min='0' max='5' v-model="newTarea.meta.countRep"><br> -->
        <!-- <input type="reset"> -->
    </form>

      <button @click="register">Registrarse</button>

  </div>
</template>



<script>
import { userStore } from '../store/user.js'
import { storeToRefs } from 'pinia'

export default {
   setup() {
    const store = userStore();
    const {registerUser} = store;
    return {
      store, registerUser
    }
  },
  data() {
    return {
      user : {nombre:"Nombre1", apellido:"apellido1", edad: 20, email: "mail1@mail.com", password: "123456", role:"ADMIN", token:'token'},
      mensajeDeError : ''
    }
  },
  methods: {
      async register() {
        try {
          const user = {...this.user}               
          const rta = this.store.setUser(user)   
          this.$router.push('/login')
          
        } catch(e) {
          this.mensajeDeError = 'Se produjo un error'
        }
      }
  }
}


</script>

<style>

</style>