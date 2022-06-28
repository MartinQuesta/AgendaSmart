import Axios from "axios";
import { get } from "immutable";
import { pushScopeId } from "vue";
import {storeToRefs} from 'pinia'
import { useRoute } from "vue-router";
import {userStore} from '../store/user.js'
import authHeader from "./auth.header.js";

const apiClient = Axios.create({
    baseURL: 'http://127.0.0.1:3500/',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default{
    setup(){
        const store = userStore()
        //const {userToken} = storeToRefs(store)
        const {userToken} = store
        return{
            userToken
        }
    },
    async getStatistics(){
        console.log('stataa');
        const token = localStorage.getItem('token')//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjYyYjkwOGY5OGVkODYxNDNlZWU4YTgwMyIsIm5vbWJyZSI6Ik5vbWJyZTEiLCJhcGVsbGlkbyI6ImFwZWxsaWRvMSIsImVkYWQiOjIwLCJlbWFpbCI6Im1haWwxMEBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE1Mc1RhRHMwbXcvUFR1QVE2V3NZRU9ILzlRTUNJcFZPcFguN2RtRHJUb2gxVWpHRHVHTmJpIiwicm9sIjoiVVNFUiIsInRva2VuIjoidG9rZW4iLCJfX3YiOjB9LCJpYXQiOjE2NTYzMTAyNTMsImV4cCI6MTY1NjQ4MzA1M30.Lzg-n0ob2GQc0d_ezKHS3Xcx8nmJjA3ySbAGv2Y2uXw' //this.userToken//
        const backList = await apiClient.get('/api/tareas/',{ 
            'headers': { 'x-access-token': token } })//)
        console.log(backList);
        return backList;
    },
    getUser(){
        return localStorage.getItem('email')
    },
    getToken(){
        return localStorage.getItem('token')
    },
    async getTareasDiaras(userID){
        console.log('apiCRUD: GET-TAREAS');
        let res
        userID = localStorage.getItem('email')
        console.log(userID);
        const token = localStorage.getItem('token')//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjYyYjkwOGY5OGVkODYxNDNlZWU4YTgwMyIsIm5vbWJyZSI6Ik5vbWJyZTEiLCJhcGVsbGlkbyI6ImFwZWxsaWRvMSIsImVkYWQiOjIwLCJlbWFpbCI6Im1haWwxMEBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE1Mc1RhRHMwbXcvUFR1QVE2V3NZRU9ILzlRTUNJcFZPcFguN2RtRHJUb2gxVWpHRHVHTmJpIiwicm9sIjoiVVNFUiIsInRva2VuIjoidG9rZW4iLCJfX3YiOjB9LCJpYXQiOjE2NTYzMTAyNTMsImV4cCI6MTY1NjQ4MzA1M30.Lzg-n0ob2GQc0d_ezKHS3Xcx8nmJjA3ySbAGv2Y2uXw' //this.userToken//
         const backList = await apiClient.get('/api/tareas/'+userID,{ 
             'headers': { 'x-access-token': token }})//)
         console.log(backList);
         return backList;
    },
    setTareasDiarias(tarea){
        tarea.meta.userData.userID = localStorage.getItem('email')
        console.log(tarea);
        fetch(apiClient.post('/api/tareas', tarea))
        .then(response => {
            console.log('ANDUVO');
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
    tareaCompletada(id,tarea){
        const token = localStorage.getItem('token')
        return apiClient.patch('/api/tareas/'+id,{ 
            'headers': { 'x-access-token': token }},)
    },
    borrarTareaDiaria(userID,id){
        userID = localStorage.getItem('email')
        return apiClient.delete('/api/tareas/',{params:{'userID':userID, 'id':id}})
    },
    setOrderTareasDiarias(){
        return apiClient.get('/api/lists')
    },
    setUser(user){
        console.log(user)
        return apiClient.post('/register', user)
    },
    async validateUser(user){
        console.log(user)
        let valid = false
        await apiClient.post('/login', user)
        .then(response => {
            this.userToken = response.data.token;
            if(response.data.token){          
            localStorage.setItem('email',this.cleanMail(response.data.usuario.email))
            localStorage.setItem('token', response.data.token)
            console.log('Seteeo en el localStorage');
            }
            valid = true
        })
        .catch(err => {
            console.log('apiCRUD - login HAY ERROR');
            console.error(err);
            valid = false
        })
        console.log(valid);
        return valid
    },
    cleanMail(email){
        let newStr = email.replace(/@/g, '');
        newStr = newStr.replace(/\./g, '');
        console.log('After character removed: ', newStr);
        return newStr;
    }
}