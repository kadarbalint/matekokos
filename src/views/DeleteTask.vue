<template>
    <div class = "bg-img">
         <top-header></top-header>
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
import TopHeader from "../components/Top-Header.vue";

export default{
    components: {
      'top-header':TopHeader,
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
background-color:white;

}
.container{
  
  background-color:whitesmoke;
 border-radius: 10px;
max-width:500px;
padding:5%;
margin-left:auto;
margin-right:auto;
}
</style>