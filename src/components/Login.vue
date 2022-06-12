<template>
  <div>
    <h2>Login</h2>
      <form class="formulario" @submit.prevent="login">

  
        <!-- ID: <input type="number" v-model="newTarea._id"><br> -->
        <ul>
          <li> Email: <input placeholder="email" type="email" v-model="user.email"></li>
          <li>Contraseña: <input placeholder="password" type="password" v-model="user.password"></li>
        </ul>
        <!-- <input type="range" min='0' max='5' v-model="newTarea.meta.countRep"><br> -->
        <!-- <input type="reset"> -->
      </form>
    <button @click="login">Login</button>
  </div>
</template>



<script>
import { userStore } from '../store/user.js'
import { storeToRefs } from 'pinia'

export default {
   setup() {
    const store = userStore();
    const {isLogged}  = storeToRefs(store);
    return {
      store, isLogged
    }
  },
  data() {
    return {
      user : {email: "", password: ""},
      mensajeDeError : ''
    }
  },
  methods: {
    login(user) {
      try {
        this.isLogged = this.store.login(user)
        if (this.isLogged) {
          this.$router.push('/tareas')
        } else {
          this.mensajeDeError = "Usuario o password inconrrecto"  
        }
      } catch(e) {
        this.mensajeDeError = "Se produjo un error"
      }
    }
  }
}
</script>

<style>

</style>