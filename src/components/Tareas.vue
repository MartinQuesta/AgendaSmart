<template>
  <div>
<h2>
    Tarea
</h2>

        <router-link to="/tareassemanales"> | Tareas Semanales |</router-link>
        <router-link to="/tareasdiarias"> | Tareas Diaria |</router-link>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>