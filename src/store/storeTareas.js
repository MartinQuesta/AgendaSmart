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
        async getTareasDiarias(userID){
            return await apiCRUD.getTareasDiaras(userID)
            // this.listaTareasDiaria = this.listaTareasDiaria.data
            // console.log(this.listaTareasDiaria);
            // return this.listaTareasDiaria
        },
        getTareasSemanales(){
            return this.listaTareasSemanales = apiCRUD.getTareasSemanales()
        },
        setTareasDiarias(tarea){
            const newList = apiCRUD.setTareasDiarias(tarea)
            console.log(newList);
            return newList
            },
        borrarTareaDiaria(userID,id){
            return apiCRUD.borrarTareaDiaria(userID,id)
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