import Axios from "axios";
import { get } from "immutable";
import { useRoute } from "vue-router";

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
    },
    setUser(user){
        console.log(user)
        return apiClient.post('/register', user)
    },
    async validateUser(user){
        console.log(user)
        let valid = false
        // const valid = 
        await apiClient.post('/login', user)
        .then(response => {
            console.log('ANDUVOLogin');
            console.log(response.data.token);
            valid = true
        })
        .catch(err => {
            console.log('apiCRUD - login HAY ERROR');
            console.error(err);
            valid = false
        })
        console.log(valid);
        return valid
    }
}