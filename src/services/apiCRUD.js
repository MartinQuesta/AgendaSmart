import Axios from "axios";

const apiClient = Axios.create({
    baseURL: 'http://localhost:3500/',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getTareasDiaras(){
        return apiClient.get('/api/tareas')
    },
    setTareasDiarias(tarea){
        return apiClient.post('/api/tareas', tarea)
    },
    /*
    getTareasSemanales(){
        return apiClient.get('/api/')
    },
    setTareasSemanales(tarea){
        return apiClient.post('/api/settareas/semanales', tarea)
    },
    */
    setOrderTareasDiarias(lista){
        console.log(`apiCRUD Ordenadas:${lista}`);
        return apiClient.get('/api/lists')
    }
}