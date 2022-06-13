import { defineStore } from 'pinia'
import apiCRUD from '../services/apiCRUD.js'


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const userStore = defineStore('main', {
  
    state: () => {
        return { 
            user: {},
            isLogged: true
        }
    },
    actions: {
        async login(user) {
            console.log(user)
            const result = await apiCRUD.validateUser(user)
            console.log(await result);
            this.isLogged = result
        },
        setUser(user){
            return apiCRUD.setUser(user)
        }
    },
    // other options...
})