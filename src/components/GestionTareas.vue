<template>
  
<div id="tareas">
    <!-- <div></div>
    <div v-if="listaTareasDiariasApiOrdenada[17].meta.isDaily == true">
        <h2>Tareas Diarias</h2>
    </div>
    <div v-else>
        <h2>Tareas Semanales</h2>
    </div> -->
        <router-link to="/tareas"> Tareas</router-link>

    <button @click="() => togglePopup('buttonTrigger')">Start Pomodoro</button>
    <Pomodoro class="popup" v-if="pomodoroTriggers.buttonTrigger" 
    :togglePopup = "() => togglePopup('buttonTrigger')">
        <h2>My PopUp 🍅</h2>
    </Pomodoro>
    <Pomodoro class="popup" v-if="pomodoroTriggers.timerTrigger" 
    :togglePopup = "() => togglePopup('timerTrigger')">
        <h2>My TImer PopUp</h2>
    </Pomodoro>

    <ul id="lista">
        <div><h2>Tareas Pendientes</h2></div>
        <li v-for="tarea in listaTareasDiariasApiOrdenada" :key="tarea.id">
              Fecha: {{ tarea.date }} | Descripcion: {{ tarea.description }} | Prioridad: {{ tarea.priority }} | palabraClave:{{tarea.keyWords}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.meta.isDelayed}} | cantRep: {{tarea.meta.countRep}}
        </li>
    </ul>
     
    <button @click="updateListaBeta">Traer Tarea</button>
    <button @click="eliminarTarea">Eliminar Tarea</button>
    {{ mensajeError }}

    <!-- <ul id="lista">
        <li v-for="tarea in listaTareasDiariasApi" :key="tarea.id">
              Fecha: {{ tarea.date }} | Descripcion: {{ tarea.description }} | Prioridad: {{ tarea.priority }} | palabraClave:{{tarea.keyWords}} | motiv:{{tarea.motiv}} | atrasada: {{tarea.meta.isDelayed}} | cantRep: {{tarea.meta.countRep}}
        </li>
    </ul> -->
</div>

</template>

<script>
import {useStore} from '../store/storeTareas.js'
import {storeToRefs} from 'pinia'
import Pomodoro from './Pomodoro.vue'
import { ref } from 'vue'


export default {
    setup() {
        const store = useStore();
        //const timer = [07,00]
        const { listaTareasDiarias } = storeToRefs(store);
        const pomodoroTriggers = ref({
            buttonTrigger: false,
            timerTrigger: false
        });
        const togglePopup = (trigger) => {
                pomodoroTriggers.value[trigger] = !pomodoroTriggers.value[trigger]
        };
        setTimeout(() => {
            pomodoroTriggers.value.timerTrigger = true
        },3000);
        //this.togglePopup(trigger);
        return {
            store,
            listaTareasDiarias,
            Pomodoro,
            pomodoroTriggers,
            togglePopup,
        };
    },
    data() {
        return {
            listaTareasDiariasApi: [],
            newTarea: { _id: 0, date: "", description: "", keyWords: [], priority: 1, title: "", motiv: "true", meta: { completed: "false", isDelayed: "false", countRep: "0", isDaily: "true" } },
            listaTareasApiOrdenada: [],
            listaTareasDiariasApiOrdenada: [],
            mensajeError: "",
        };
    },
    created: async function () {
        try {
            //await this.updateLista()
            await this.updateListaBeta();
        }
        catch (err) {
            console.log(err);
            this.mensajeError = "Hubo un error";
        }
    },
    methods: {
        async agregarTarea() {
            try {
                const tarea = { ...this.newTarea };
                //this.agregoId(tarea)
                await this.store.setTareasDiarias(tarea);
                this.updateLista();
            }
            catch (err) {
                this.errMensaje(err);
            }
        },
        agregoId(tarea) {
            var newId = this.listaTareasDiariasApi.lenght;
            console.log(newId);
        },
        errMensaje(err) {
            console.log(err);
            this.mensajeError = "Hubo un error";
        },
        eliminarTarea() {
            console.log("llego al metodo");
            this.store.agregarTareaDiaria({ ...this.newTarea });
        },
        async updateLista() {
            const rta = await this.store.getTareasDiarias();
            this.listaTareasDiariasApi = await rta.data;
            console.log(rta.data);
            //this.listaTareasDiariasApiOrdenada = await this.store.setOrderTareasDiarias({...this.listaTareasDiariasApi})
            this.listaTareasDiariasApiOrdenada = this.listaTareasDiariasApi;
            this.updateListaBeta();
            //return this.listaTareasApiOrdenada      //porque la lista Api no se ordena, y la ordenada sii???
            //this.updateListaBeta()
        },
        async updateListaBeta() {
            const rta = await this.store.setOrderTareasDiarias();
            console.log("aquiiii DATAAAAA");
            console.log(rta.data.data);
            this.listaTareasDiariasApi = await rta.data.data;
            this.listaTareasDiariasApiOrdenada = this.listaTareasDiariasApi;
            // this.listaTareasDiariasApiOrdenada = 
            //await this.store.setOrderTareasDiarias({...this.listaTareasDiariasApi})
            this.listaTareasDiariasApi = [];
            //this.listaTareasDiariasApi = []
            //this.listaTareasDiariasApi = this.listaTareasApiOrdenada
        }
    },
    components: { Pomodoro }
}
</script>

<style lang="scss" scoped>
#tareas{
     position:fixed;

    // margin: 0;
     padding-right: 15rem;
    // position: absolute;

     //position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
     //z-index: 99;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.popup{
    text-decoration-color: rgb(12, 14, 13);
    text-emphasis-color: rgb(0,0,0);
}

button{
    margin-top: 20px;
    width: 200px;
    height: 38px;
    background: #FFF;
    border-radius: 30px;
    cursor:pointer;
}
</style>