import { defineStore } from 'pinia'
import apiCRUD from '../services/apiCRUD.js'
import {userStore} from './user.js'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  
    state: () => {
        return { listaTareasDiaria: [],
                 listaTareasSemanales: [],
                 listaTareasOrdenadas: [] }
    },
    actions: {
        async getStatistics(){
            return await apiCRUD.getStatistics()
        },
        getToken(){
            return apiCRUD.getToken()
        },
        getUser(){
            return apiCRUD.getUser()
        },
        async modificarTarea(id,tarea){
            return await apiCRUD.tareaCompletada(id,tarea)
        },
        async getTareasDiarias(userID){
            console.log('ACA ESTAMOS EN STOREtareas');
            return await apiCRUD.getTareasDiaras(userID)
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