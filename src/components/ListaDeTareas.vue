<template>
  
<div>
    <h2>Lista de Tareass</h2>
    {{listaTareasDiariaApi}}
    <button @click="updateLista">Traer Tareas </button>

    <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApi" :key="tarea.id">
               ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>

     <ul id="lista">
        <li v-for="tarea in listaTareasSemanales" :key="tarea.id">
               ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>
</div>
</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'


export default {
    data(){
        return{
            listaTareasDiariasApi:[],
            newTarea:{id:0, desc:'', prioridad:0}
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
            const rta = await this.store.getTareasDiarias('jobs')
            this.listaTareasDiarias = rta
            this.updateListaBeta()
        },
        async updateListaBeta() {
            const rta = await this.store.setOrderTareasDiarias();
            console.log("aquiiii DATAAAAA");
            console.log(rta.data.data);
            this.listaTareasDiariasApi = await rta.data.data;
            this.listaTareasDiarias = this.listaTareasDiariasApi;
            // this.listaTareasDiariasApiOrdenada = 
            //await this.store.setOrderTareasDiarias({...this.listaTareasDiariasApi})
            this.listaTareasDiariasApi = [];
            //this.listaTareasDiariasApi = []
            //this.listaTareasDiariasApi = this.listaTareasApiOrdenada
        }        
    }
}
</script>

<style>

</style>