<template>
    <h2>Tareas Diarias</h2>
  
<div id="tareas">
        <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApiOrdenada" :key="tarea.id"></li>
              <li>Fecha: {{ tarea.date }} | Descripcion: {{ tarea.description }} | </li>
              <li> Prioridad: {{ tarea.priority }} | palabraClave:{{tarea.keyWords}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.meta.isDelayed}} | cantRep: {{tarea.meta.countRep}}</li>
              <li>UserID: {{tarea.meta.userData.userID}} </li>
            <button @click="eliminarTarea(tarea._id)">Anular Tarea</button>
        
        
        <li>
            
        </li>
    </ul>
    <!-- <form class="formulario" action="agregarTarea"> -->
    <form class="formulario" @submit.prevent>

        <h3>Agregar Tarea:</h3>
        <!-- ID: <input type="number" v-model="newTarea._id"><br> -->
        Titulo: <input type="text" v-model="newTarea.tittle"><br>
        Descripcion: <input type="text" v-model="newTarea.description"><br>
        Prioridad: <input type="number" id='priority' v-model="newTarea.priority">
        <!-- <input type="range" min='1' max='10' v-model="newTarea.priority"><br> -->
        Palabras Claves: <input type="text" v-model="newTarea.keyWords"><br>
        motivado: <input type="checkbox" value='true' v-model="newTarea.motiv"><br>
        isDaily: <input type="checkbox" value='true' v-model="newTarea.meta.isDaily"><br>
        Repeticiones: <input type="number" id='countRep' v-model="newTarea.meta.countRep">
        Usuario: <input type="text" id='userID' v-model="newTarea.meta.userData.userID">
        <!-- <input type="range" min='0' max='5' v-model="newTarea.meta.countRep"><br> -->
        <!-- <input type="reset"> -->
    <button @click="agregarTarea">Agregar Tarea</button>
    
    <button @click="updateLista">Traer Tarea</button>
    </form>
     

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
            newTarea:{_id:0,tittle:'Titulo', description:'Descripcion',keyWords: [], priority: 1, motiv:true,meta:{ completed: false, isDelayed:false, isDaily: true, countRep:0, userData:{userID:'user2',userToken:'0101'}}}
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
                this.store.setTareasDiarias(tarea)
                await this.updateLista()
            }catch(err){
                console.log(err);
                this.mensajeError = 'Tarea Diaria,Hubo un error'
            }
                this.updateLista()

        },
       eliminarTarea(id){
            const userID = this.newTarea.meta.userData.userID
            this.store.borrarTareaDiaria(userID,id)
        },
        async updateLista (){
            const tarea = {...this.newTarea}
            console.log(tarea.meta.userData.userID);
            const userId = tarea.meta.userData.userID;
            const rta = await this.store.getTareasDiarias(userId)
            console.log(rta);
            this.listaTareasDiariasApiOrdenada = rta.data
            this.updateListaBeta()
        },
        async updateListaBeta (){
            this.listaTareasDiariasApi  = []
        },
        filtroTareasDiarias(tareas){
            
        }
    }
}
</script>


<style lang="scss" scoped>

#tareas{
     position:fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // z-index: 99;
display:flex;
    // display: flex;
    // align-items: center;
    // justify-content:center;
}
.formulario{
    background: rgba(23, 38, 78, 0.708);
    border-radius: 30px;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  display: flex;


}

button{
    margin-top: 20px;
    width: 200px;
    height: 38px;
    background: gray;
    border-radius: 30px;
    cursor:pointer;
}
</style>