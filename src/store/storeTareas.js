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
            return apiCRUD.setTareasDiarias(tarea)
            },
        setTareasSemanales(tarea){
            return apiCRUD.setTareasSemanales(tarea)
            },
        setOrderTareasDiarias(lista){
            const newLista = apiCRUD.setOrderTareasDiarias(lista)
            return newLista
            }
    },
    // other options...
})