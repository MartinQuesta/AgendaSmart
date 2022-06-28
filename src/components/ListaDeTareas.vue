<template>
  
<div>
    <h2>Metricas sobre tus Tareas</h2>
        <router-link to="/tareas"> Volver a Tareas</router-link><br>
       User: {{user}} <br>
       Token: {{token}}
<ul id="lista">
    Total de Tareas Completadas :{{TareasDiaria.data.completedJob}}<br>
    Tarea mas antigua Pendiente: {{TareasDiaria.data.earlyDate}}<br>
    Total de Tareas: {{TareasDiaria.data.qnty}}<br>
</ul>
    <button @click="updateLista">Traer Tareas </button>

    <!-- <ul id="lista">
        <li v-for="tarea in listaTareasDiaria" :key="tarea.id">
               Prioridad: {{ tarea.priority }} | Descripcion: {{ tarea.description }} | tittle: {{ tarea.tittle }}
        </li>
    </ul> -->
</div>
</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'


export default {
    data(){
        return{
            TareasDiaria:{},
            user:'',
            token:'',
            newTarea:{id:0, desc:'', prioridad:0},
        }
    },
    setup(){
        const store = useStore()
        const {listaTareasDiaria} = storeToRefs(store)
        const {listaTareasSemanales} = storeToRefs(store)
        return{
            store,listaTareasDiaria,listaTareasSemanales
        }
    },
    created: async function (){
        try{
            this.updateLista()
        }catch(err){
            console.log(err);
            this.mensajeError = 'Hubo un error'
        }
    },
    methods:{
        async updateLista (){
            const rta = await this.store.getStatistics()
            console.log(rta);
            this.TareasDiaria = rta
            this.user = this.store.getUser()
            this.token = this.store.getToken()
            //this.user = localStorage.getItem('mail')
            //this.updateListaBeta()
        },      
    }
}
</script>

<style>

</style>