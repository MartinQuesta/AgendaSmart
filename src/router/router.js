
import {createRouter, createWebHashHistory} from 'vue-router'
import Tareas from '../components/Tareas.vue'
import Home from '../components/home.vue'
import GestionTareas from '../components/GestionTareas.vue'
import Usuario from '../components/Usuario.vue'
import NotFound from '../components/NotFound.vue'
import TareasDiarias from '../components/TareasDiarias.vue'
import TareasSemanales from '../components/TareasSemanales.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/tareas', component: Tareas },
    { path: '/tareasdiarias', component: TareasDiarias },
    { path: '/tareassemanales', component: TareasSemanales },
    { path: '/gestiontarea', component: GestionTareas },
    { path: '/usuario/:id', component: Usuario },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

  ]
  
  const router = createRouter({
      history: createWebHashHistory(),
      routes,
  })

  export default router