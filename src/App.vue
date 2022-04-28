<script setup>
import Home from './components/home.vue'
import Tareas from './components/Tareas.vue'
import GestionTareas from './components/GestionTareas.vue'
</script>

<template>
    <div>
      <p>
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
       <router-link to="/">| Home | </router-link>
        <router-link to="/about"> Go to About | </router-link>
        <router-link to="/tareas"> Tareas</router-link>
        <router-link to="/gestiontarea"> | Gestion Tareas |</router-link>
     </p>
  <router-view></router-view>
    </div>

</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
