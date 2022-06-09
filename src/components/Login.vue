<template>
  <div>
      <h2>Login</h2>
      email <input type="email" v-model="user.email">
      password <input type="password" v-model="user.password">
      <button @click="login">Login</button>
  </div>
</template>



<script>
import { usuarioStore } from '../store/user.js'
import { storeToRefs } from 'pinia'

export default {
   setup() {
    const store = usuarioStore();
    const {estaLogeado}  = storeToRefs(store);
    const {registerUser} = store;
    return {
      store, registerUser, estaLogeado
    }
  },
  data() {
    return {
      usuario : {email: "", password: ""},
      mensajeDeError : ''
    }
  },
  methods: {
    async login() {
      try {
        await this.registerUser({...this.usuario})
        if (this.estaLogeado) {
          this.$router.push('/vendedor')
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