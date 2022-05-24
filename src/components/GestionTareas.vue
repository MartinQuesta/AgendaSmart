<template>
  
<div>
    <div></div>
    <div v-if="listaTareasApiOrdenada.data[0].esDia == 'true'">
        <h2>Tareas Diarias</h2>
    </div>
    <div v-else>
        <h2>Tareas Semanales</h2>
    </div>
        <ul id="lista">
        <li v-for="tarea in listaTareasApiOrdenada.data" :key="tarea.id">
              ID: {{ tarea.id }} | Descripcion: {{ tarea.desc }} | Prioridad: {{ tarea.prioridad }} | palabraClave:{{tarea.palabraClave}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.atrasada}} | cantRep: {{tarea.cantRep}}
        </li>
    </ul>
    <form action="agregarTarea">
        ID: <input type="number" v-model="newTarea.id"><br>
        Descripcion: <input type="text" v-model="newTarea.desc"><br>
        Prioridad: <input type="number" id='prioridad' v-model="newTarea.prioridad"><input type="range" min='1' max='10' v-model="newTarea.prioridad"><br>
        Palabras Claves: <input type="text" v-model="newTarea.palabraClave"><br>
        motivado: <input type="checkbox" value='true' v-model="newTarea.motiv"> 
        Semanal: <input type="checkbox" value='true' v-model="newTarea.esDia"><br>
        cantidad de repeticiones: <input type="number" id='cantRep' v-model="newTarea.cantRep"><input type="range" min='0' max='5' v-model="newTarea.cantRep"><br>
        <input type="reset">
    </form>
     
    <button @click="agregarTarea">Agregar Tarea</button>
    <button @click="updateListaBeta">Traer Tarea</button>
    <button @click="eliminarTarea">Eliminar Tarea</button>
    {{ mensajeError }}

    <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApi" :key="tarea.id">
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
        const {listaTareasDiarias} = storeToRefs(store)

        return{
            store,listaTareasDiarias
        }
    },
    data(){
        return{
            listaTareasDiariasApi: [],
            listaTareasApiOrdenada:[],
            mensajeError: '',
            newTarea:{id:0, desc:'', prioridad:0, palabraClave:'', motiv:'true', atrasada:'0',cantRep:'0', esDia: 'false'}
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
                //this.agregoId(tarea)
                await this.store.setTareasDiarias(tarea)
                this.updateLista()
            }catch(err){
                this.errMensaje(err)
            }
        },
        agregoId(tarea){
            var newId = this.listaTareasDiariasApi.lenght
            console.log(newId);
        },
        errMensaje (err){
                console.log(err);
                this.mensajeError = 'Hubo un error'
        },
       eliminarTarea(){
            console.log('llego al metodo');
            this.store.agregarTareaDiaria({...this.newTarea})
        },
        async updateLista (){
            const rta = await this.store.getTareasDiarias()
            this.listaTareasDiariasApi = rta.data
            this.listaTareasApiOrdenada = await this.store.setOrderTareasDiarias({...this.listaTareasDiariasApi})
            return this.listaTareasApiOrdenada      //porque la lista Api no se ordena, y la ordenada sii???
            //this.updateListaBeta()
        },
        async updateListaBeta (){
            /*console.log('estoy en la BETA');
            const backList = []
            const rta = await this.store.getTareasDiarias()
            backList = await rta.data
            console.log('rta.dataaaaaaaaaaaaaaaa');
            console.log(backList);
            //backList = rta.data
            */
            this.listaTareasDiariasApi  = []
            //this.listaTareasDiariasApi = []
            //this.listaTareasDiariasApi = this.listaTareasApiOrdenada
        }
    }
}
</script>

<style>

</style>