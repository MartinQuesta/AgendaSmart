<template>
  
<div>
     <div><h2>Tareas Diarias</h2></div>
    
     ID: <input type="text" v-model="newTarea.id"><br>
     Descripcion: <input type="text" v-model="newTarea.desc"><br>
     Prioridad: <input type="text" v-model="newTarea.prioridad"><br>

    <ul id="lista">
        <li v-for="tarea in listaTareasDiaria" :key="tarea.id">
              ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>
    <button @click="agregar">Agregar Tarea</button>
    <button @click="eliminarTarea">Eliminar Tarea</button>
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'

export default {
    setup(){
        const store = useStore()
        const {listaTareasDiaria} = storeToRefs(store)
        return{
            store,listaTareasDiaria
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
            this.store.agregarTareaDiaria({...this.newTarea})
        },
       eliminarTarea(){
            console.log('llego al metodo');
            this.store.agregarTareaDiaria({...this.newTarea})
        },
    }

}
</script>

<style>

</style>