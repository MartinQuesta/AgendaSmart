import Axios from "axios";

const apiClient = Axios.create({
    baseURL: 'http://127.0.0.1:3500/',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getTareasDiaras(){
        console.log('apiCRUD: GET-TAREAS');
        return apiClient.get('/api/tareas')
    },
    setTareasDiarias(tarea){
        apiClient.post('/api/tareas', tarea)
        .then(response => {
            console.log('ANDUVO');
            console.log(response);
            return response
        })
        .catch(err => {
            console.log('apiCRUD - SetTareas HAY ERROR');
            console.log(err.response);
            console.error(err);
            return err
        })
    },
    borrarTareaDiaria(id){
        return apiClient.delete('/api/tareas/'+id)
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