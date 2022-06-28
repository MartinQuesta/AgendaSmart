<template>

  <div>
      <h2>Home</h2>
        Welcome to the smartest agenda in the world<br>
        Lista de Funciones:
        <ul id="list" v-for="task in backlogList" :key="task.id">
          Task: {{task.name}} <br>
          State: {{ task.state}}
                __________________________________________________ 
        </ul>      
</div>
  
</template>

<script>
import tools from '../services/helpTools.js';

export default {
  created: function (){
        try{
            this.taskListCreator()
        }catch(err){
          tools.conLogErr('Home CreatedMethod: Hubo un error al crear la vista',err)
          this.errorMensaje = 'Hubo un error al crear la vista'
        }
  },
   data(){
        return{
            backlogList: [],
            errorMensaje:''
        }
   },
methods:{
    taskAdd(task){
      return this.backlogList.push(task)
    },
    taskAdmin(){
      const tasks = [{
          name: 'Usuario es mail sin @ ni .',
          state: true,
          type: '',
          id: ''
      },
      {   
          name: 'Cada usuario tiene una instancia en la Base de datos.',
          state: true,
          type:'',
          id: ''
      },
      {
        name: 'Las Tareas se ordenan por fecha y prioridad',
        state: true,
        type: '',
        id: ''
      },
      {
        name: 'Token autoriza acceso a métodos',
        state: true,
        type: '',
        id: ''
      },
      {
        name: 'El usuario solo puede agregar , eliminar o completar sus tareas',
        state: true,
        type: '',
        id: ''
      }]
      return tasks;
    },
    taskListCreator(){
        const array = this.taskAdmin();
        let id = 0
        array.forEach(element => {
          element.id = id;
          this.taskAdd(element);
          id += 1;
          });
    }
}
}
</script>

<style>

</style>