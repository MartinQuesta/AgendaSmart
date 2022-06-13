import Axios from "axios";

const apiClient = Axios.create({
    baseURL: 'http://127.0.0.1:3500/',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    async getTareasDiaras(userID){
        let res
        console.log('apiCRUD: GET-TAREAS');
        await apiClient.get('/api/tareas/'+userID)
        .then(response => {
            console.log('ANDUVO');
            res = response;
        })
        .catch(err => {
            console.log('apiCRUD - SetTareas HAY ERROR');
            console.log(tarea);
            console.log(err.response);
            console.error(err);
            res = err
        })
        console.log(res);
        return res
    },
    setTareasDiarias(tarea){
        fetch(apiClient.post('/api/tareas', tarea))
        .then(response => {
            console.log('ANDUVO');
            console.log(response);
            return response
        })
        .catch(err => {
            console.log('apiCRUD - SetTareas HAY ERROR');
            console.log(tarea);
            console.log(err.response);
            console.error(err);
            return err
        })
    },
    borrarTareaDiaria(userID,id){
        console.log(userID);
        return apiClient.delete('/api/tareas/',{params:{'userID':userID, 'id':id}})
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