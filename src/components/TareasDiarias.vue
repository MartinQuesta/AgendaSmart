<template>
  
<div>
    <div><h2>Tareas Diarias</h2></div>
        <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApiOrdenada" :key="tarea.id">
              Fecha: {{ tarea.date }} | Descripcion: {{ tarea.description }} | Prioridad: {{ tarea.priority }} | palabraClave:{{tarea.keyWords}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.meta.isDelayed}} | cantRep: {{tarea.meta.countRep}}
        </li>
    </ul>
    <form action="agregarTarea">
        <!-- ID: <input type="number" v-model="newTarea._id"><br> -->
        Titulo: <input type="text" v-model="newTarea.title"><br>
        Descripcion: <input type="text" v-model="newTarea.description"><br>
        Prioridad: <input type="number" id='prioridad' v-model="newTarea.priority"><input type="range" min='1' max='10' v-model="newTarea.priority"><br>
        Palabras Claves: <input type="text" v-model="newTarea.keyWords"><br>
        motivado: <input type="checkbox" value='true' v-model="newTarea.motiv"><br>
        isDaily: <input type="checkbox" value='true' v-model="newTarea.meta.isDaily"><br>
        cantidad de repeticiones: <input type="number" id='cantRep' v-model="newTarea.meta.countRep"><input type="range" min='0' max='5' v-model="newTarea.meta.countRep"><br>
        <input type="reset">
    </form>
     
    <button @click="agregarTarea">Agregar Tarea</button>
    <button @click="updateListaBeta">Traer Tarea</button>
    <button @click="eliminarTarea">Eliminar Tarea</button>
    {{ mensajeError }}

    <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApi" :key="tarea.id">
              ID: {{ tarea._id }} | Descripcion: {{ tarea.description }} | Prioridad: {{ tarea.priority }} | palabraClave: {{tarea.keyWords}} | motiv: {{tarea.motiv}} | atrasada: {{tarea.meta.isDelayed}} | isDaily: {{tarea.meta.isDaily}} | cantRep: {{tarea.meta.countRep}}
        </li>
    </ul>
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'
import taskmodel from '../models/taskmodel.js'

export default {
    setup(){
        const store = useStore()
        const {listaTareasDiarias} = storeToRefs(store)

        return{
            store,listaTareasDiarias
        }
    },
    data(){
        return{
            listaTareasDiariasApi: [],
            listaTareasDiariasApiOrdenada:[],
            mensajeError: '',
            newTarea:{_id:0, date:'', description:'',keyWords: [], priority: 1, title:'', motiv:'true',meta:{ completed: 'false', isDelayed:'false',countRep:'0', isDaily: 'true'}}
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
                tarea.date = Date.now
                await this.store.setTareasDiarias(tarea)
                this.updateLista()
            }catch(err){
                console.log(err);
                this.mensajeError = 'Hubo un error'
            }
        },
       eliminarTarea(){
            console.log('llego al metodo');
            this.store.agregarTareaDiaria({...this.newTarea})
        },
        async updateLista (){
            const rta = await this.store.getTareasDiarias()
            console.log(rta);
            console.log(rta.data);
            this.listaTareasDiariasApi = await rta.data
            console.log(this.listaTareasDiariasApi[1]);
            //this.listaTareasDiariasApiOrdenada = await this.store.setOrderTareasDiarias({...this.listaTareasDiariasApi})
            this.listaTareasDiariasApiOrdenada = this.listaTareasDiariasApi
            this.updateListaBeta()
        },
        async updateListaBeta (){
            this.listaTareasDiariasApi  = []
        }
    }
}
</script>

<style>

</style>