<template>
  <div>
      <h2>Log out</h2>
      <button @click="logout">Salir del sistema</button>
  </div>
</template>

<script>
import {userStore} from '../store/user.js'
export default {
  setup() {
    const store = userStore();
    const {userLogout} = store;
    return {
      store, userLogout
    }
  },
  methods: {
    logout() {
      this.userLogout();
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>