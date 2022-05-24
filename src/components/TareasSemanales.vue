<template>
  
<div>
    <div><h2>Tareas Semamales</h2></div>
    <form action="agregarTarea">
        ID: <input type="number" v-model="newTarea.id"><br>
        Descripcion: <input type="text" v-model="newTarea.desc"><br>
        Prioridad: <input type="number" id='prioridad' v-model="newTarea.prioridad"><input type="range" min='1' max='10' v-model="newTarea.prioridad"><br>
        Palabras Claves: <input type="text" v-model="newTarea.palabraClave"><br>
        motivado: <input type="checkbox" value='true' v-model="newTarea.motiv"><br>
        cantidad de repeticiones: <input type="number" id='cantRep' v-model="newTarea.cantRep"><input type="range" min='0' max='5' v-model="newTarea.cantRep"><br>
        <input type="reset">
    </form>
     
    <button @click="agregarTarea">Agregar Tarea</button>
    <button @click="updateLista">Traer Tarea</button>
    <button @click="eliminarTarea">Eliminar Tarea</button>
    {{ mensajeError }}

    <ul id="lista">
        <li v-for="tarea in listaTareasSemanalesApi" :key="tarea.id">
              ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }} | palabraClave:{{tarea.palabraClave}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.atrasada}} | cantRep: {{tarea.cantRep}}
        </li>
    </ul>
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
            listaTareasSemanalesApi: [],
            mensajeError: '',
            newTarea:{id:0, desc:'', prioridad:0, palabraClave:'', motiv:'false', atrasada:'0',cantRep:'0'}
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
        async agregarTarea(){
            try{
                const tarea = {...this.newTarea}
                await this.store.setTareasSemanales(tarea)
                this.updateLista()
            }catch(err){
                this.errMensaje(err)
            }
        },
        errMensaje (err){
                console.log(err);
                this.mensajeError = 'Hubo un error'
        },
        eliminarTarea(){
            console.log('llego al metodo');
            this.store.agregarTareaSemanales({...this.newTarea})
        },
        async updateLista (){
            const rta = await this.store.getTareasSemanales()
            this.listaTareasSemanalesApi = rta.data
        }
    }
}
</script>

<style>

</style>