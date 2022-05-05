import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  
    state: () => {
        return { listaTareasDiaria: [],
                 listaTareasSemanales: [] }
    },
    actions: {
        agregarTareaDiaria(tarea){
        this.listaTareasDiaria.push(tarea)
        console.log('agrego una Tarea');
        },
        agregarTareaSemanal(tarea){
            this.listaTareasSemanales.push(tarea)
            console.log('agrego una Tarea');
            }
    },
    // other options...
})