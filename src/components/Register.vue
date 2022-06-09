<template>
  <div>
      <h2>Login</h2>
      email <input type="email" v-model="user.email">
      password <input type="password" v-model="user.password">
      <button @click="login">Login</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>