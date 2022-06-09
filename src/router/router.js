
import {createRouter, createWebHashHistory} from 'vue-router'
import Tareas from '../components/Tareas.vue'
import Home from '../components/home.vue'
import GestionTareas from '../components/GestionTareas.vue'
import Usuario from '../components/Usuario.vue'
import NotFound from '../components/NotFound.vue'
import TareasDiarias from '../components/TareasDiarias.vue'
import TareasSemanales from '../components/TareasSemanales.vue'
import CarritoDeTareas from '../components/carritoDeTareas.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

    { path: '/tareas', component: Tareas},
    { path: '/tareasdiarias', component: TareasDiarias},
    { path: '/tareassemanales', component: TareasSemanales},
    { path: '/gestiontarea', component: GestionTareas},
    { path: '/usuario/:id', component: Usuario},
    { path: '/carritodetareas', component: CarritoDeTareas},
    { path: '/logout', component: Logout}
    
  ]
  
  const router = createRouter({
      history: createWebHashHistory(),
      routes,
  })

  router.beforeEach((to, from, next) => {

    const login = localStorage.getItem('usuario')
    const obj = JSON.parse(login)
    //console.log( obj );

    if( to.matched.some(record => record.meta.requiresAuth ) && !login ) {
        next('/')
    } else {
        next()
    }

  })

  export default router