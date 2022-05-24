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
        return apiClient.get('/api/gettareas/diarias')
    },
    setTareasDiarias(tarea){
        return apiClient.post('/api/settareas/diarias', tarea)
    },
    getTareasSemanales(){
        return apiClient.get('/api/gettareas/semanales')
    },
    setTareasSemanales(tarea){
        return apiClient.post('/api/settareas/semanales', tarea)
    },
    setOrderTareasDiarias(lista){
        console.log(`apiCRUD Ordenadas:${lista}`);
        return apiClient.post('/api/gettareas/ordenadas', lista)
    }
}