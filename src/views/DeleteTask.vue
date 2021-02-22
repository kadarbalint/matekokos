<template>
    <div class = "bg-img">
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
        <h1>Task1</h1>
        <div v-for="task in tasks" v-bind:key="task.id">
            <Card v-bind:task="task"></Card>
              <button v-on:click= "deleteTask(task.id)" >Feladat törlése</button>
        </div>
       
    </div>
</template>

<script>
import { db } from "../main";
import Card from '../components/Card';

export default{
    components: {
        Card
    },
    data () {
    return {
      tasks: []
    }},
    mounted(){
        this.getCollection('tasks');
    },
    methods: {
    async getCollection(collectionName) {
      let snapshot = await db.collection(collectionName).get();
      let tasks = [];
      snapshot.forEach(task => {
        let appData = task.data();
        appData.id = task.id;
        tasks.push(appData);
      });
      this.tasks = tasks;
    },
    deleteTask(id){
    db.collection("tasks").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    this.$router.go()
}).catch((error) => {
    console.error("Error removing document: ", error);
});
    },
    }
}

</script>

<style lang = "scss" scoped>
.bg-img{
background: rgb(255,255,255);
background: linear-gradient(356deg, rgba(255,255,255,1) 0%, rgba(0,212,255,1) 100%);
}
.container{
  
  background-color:white;
  width: auto;
  margin-left: auto;
  margin-right:auto;
}

</style>