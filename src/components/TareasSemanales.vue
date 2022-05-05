<template>
  
<div>
    <div><h2>Tareas Semanales</h2></div>

    ID: <input type="text" v-model="newTarea.id"><br>
    Descripcion: <input type="text" v-model="newTarea.desc"><br>
    Prioridad: <input type="text" v-model="newTarea.prioridad"><br>

    <ul id="lista">
        <li v-for="tarea in listaTareasSemanales" :key="tarea.id">
               ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>

    <button @click="agregar">Agregar Tarea</button>
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'

export default {
    setup(){
        const store = useStore()
        const {listaTareasSemanales} = storeToRefs(store)
        return{
            store,listaTareasSemanales
        }
    },
    data(){
        return{
          newTarea:{id:0, desc:'', prioridad:0}
        }
    },
    methods:{
        agregar(){
            console.log('llego al metodo');
            this.store.agregarTareaSemanal({...this.newTarea})
        },
    }

}
</script>

<style>

</style>