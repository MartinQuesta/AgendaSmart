<template>
  
<div>
    <h2>Carrito de Tareass</h2>

    <ul id="lista">
        <li v-for="tarea in listaTareasDiaria" :key="tarea.id">
               ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>

        <ul id="lista">
        <li v-for="tarea in listaTareasSemanales" :key="tarea.id">
               ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }}
        </li>
    </ul>

   <!-- <button @click="agregarObjeto">Agregar Tarea</button> -->
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'

export default {
    setup(){
        const store = useStore()
        const {listaTareasDiaria} = storeToRefs(store)
        const {listaTareasSemanales} = storeToRefs(store)
        return{
            store,listaTareasDiaria,listaTareasSemanales
        }
    },
    methods:{
        agregar(){
            console.log('llego al metodo');
            this.store.agregarTarea()
        },
        agregarObjeto(){
            console.log('llego al metodo');
            this.store.agregarTareaConObj({id:1,desc:"Tarea1"})
        }
    }

}
</script>

<style>

</style>