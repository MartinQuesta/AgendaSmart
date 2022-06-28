<template>
        <router-link to="/tareas">| Tareas</router-link><br>

    <h2>Tareas Diarias</h2>
  
<div id="tareas">
    <!-- <form class="formulario" action="agregarTarea"> -->
        {{isLogged}}
    <form class="formulario" @submit.prevent>

        <h3>Agregar Tarea:</h3>
        <!-- ID: <input type="number" v-model="newTarea._id"><br> -->
        Titulo: <input type="text" v-model="newTarea.tittle">
        Descripcion: <input type="text" v-model="newTarea.description">
        Prioridad: <input type="number" id='priority' v-model="newTarea.priority">
        <input type="range" min='1' max='10' v-model="newTarea.priority">
        Palabras Claves: <input type="text" v-model="newTarea.keyWords">
        motivado: <input type="checkbox" value='true' v-model="newTarea.motiv">
        isDaily: <input type="checkbox" value='true' v-model="newTarea.meta.isDaily">
        Repeticiones: <input type="number" id='countRep' v-model="newTarea.meta.countRep">
        <input type="range" min='0' max='5' v-model="newTarea.meta.countRep"><br>
        Usuario: <input type="text" id='userID' v-model="newTarea.meta.userData.userID">
        completada: <input type="checkbox" value='true' v-model="newTarea.meta.completed">


    <input type="reset">
    <button @click="agregarTarea">Agregar Tarea</button>
    <button @click="updateLista">Traer Tarea</button>
    </form>

    {{ mensajeError }}
   <div id="listContainer">
        <ul id="list" v-for="tarea in listaTareasDiariasApiOrdenada" :key="tarea._id">
         Titulo: {{tarea.tittle}}
              <li id="itemList">Fecha: {{ tarea.date }} | Descripcion: {{ tarea.description }}  </li>
              <li id="itemList"> Prioridad: {{ tarea.priority }} | palabraClave:{{tarea.keyWords}} | Completed: {{tarea.meta.completed}} | cantRep: {{tarea.meta.countRep}}</li>
              <li id="itemList">UserID: {{tarea.meta.userData.userID}} </li>
            <button id="redButton" @click="eliminarTarea(tarea._id)">Anular Tarea</button>
            <button id="greenButton" @click="modificarTarea(tarea._id)">Modificar Tarea</button><br>
                __________________________________________________
            
        </ul>
    </div>
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'
import { userStore } from '../store/user.js'
import taskmodel from '../models/taskmodel.js'


export default {
    setup(){
        const store = useStore()
        const {listaTareasDiarias} = storeToRefs(store)
        const storeUSer = useStore()
        const {isLogged} = storeUSer
        
        return{
            store,listaTareasDiarias, isLogged
        }
    },
    data(){
        return{
            listaTareasDiariasApi: [],
            listaTareasDiariasApiOrdenada:[],
            mensajeError: '',
            newTarea:{_id:0,tittle:'Titulo', description:'Descripcion',keyWords: [], priority: 1, motiv:true,meta:{ completed: false, isDelayed:false, isDaily: true, countRep:0, userData:{userID:'user2',userToken:'0101'}}},
            isLogged : true
        }
    },
    created: async function (){
        try{
            await this.updateLista()
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
        },
       eliminarTarea(id){
            const userID = this.newTarea.meta.userData.userID
            this.store.borrarTareaDiaria(userID,id)
            this.updateLista()
        },
        modificarTarea(id){
            const tarea = {...this.newTarea}
            tarea.meta.completed = true;
            this.store.modificarTarea(id,tarea)
            this.updateLista()
        },
        async updateLista (){
            try{
            const tarea = {...this.newTarea}
            const userId = tarea.meta.userData.userID;
            const rta = await this.store.getTareasDiarias(userId)
            console.log(rta.data);
            this.listaTareasDiariasApiOrdenada = await rta.data
            this.updateListaBeta()
            }catch(err){
                console.log(err);
                this.mensajeError = 'Hubo un error en Update'
            }
        },
        async updateListaBeta (){
            this.listaTareasDiarias  = this.listaTareasDiariasApiOrdenada
        },
        filtroTareasDiarias(tareas){
            
        }
    }
}
</script>


<style lang="scss" scoped>
#listContainer{
    justify-content: center;
    align-items: center;
    overflow: auto;

}
#itemList{
    padding-left: 1cm;
    list-style: none;
    background: rgba(23, 38, 78, 0.708);

}
#redButton{
    background: rgba(144, 10, 0, 0.708);
    
    //border-radius: 30px;
}
#greenButton{
    background: rgba(2, 112, 13, 0.708);

}
#tareas{
     position:fixed;
     overflow: auto;
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
overflow: auto

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