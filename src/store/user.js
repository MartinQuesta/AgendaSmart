import { defineStore } from 'pinia'


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const userStore = defineStore('main', {
  
    state: () => {
        return { 
            user: {},
            isLogged: false
        }
    },
    actions: {
        login(user) {
            console.log(user)
        }
    },
    // other options...
})