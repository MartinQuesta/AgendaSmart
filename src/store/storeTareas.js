import { defineStore } from 'pinia'
import apiCRUD from '../services/apiCRUD.js'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  
    state: () => {
        return { listaTareasDiaria: [],
                 listaTareasSemanales: [],
                 listaTareasOrdenadas: [] }
    },
    actions: {
        getTareasDiarias(){
            return this.listaTareasDiaria = apiCRUD.getTareasDiaras()
        },
        getTareasSemanales(){
            return this.listaTareasSemanales = apiCRUD.getTareasSemanales()
        },
        setTareasDiarias(tarea){
            const newList = apiCRUD.setTareasDiarias(tarea)
            console.log(newList);
            return newList
            },
        borrarTareaDiaria(id){
            return apiCRUD.borrarTareaDiaria(id)
            },
        setTareasSemanales(tarea){
            return apiCRUD.setTareasSemanales(tarea)
            },
        setOrderTareasDiarias(){
            const newLista = apiCRUD.setOrderTareasDiarias()
            return newLista
            }
        
    },
    // other options...
})