<template>
        <div>
        <top-header></top-header>
         <div class = "bg-img">
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
        <h1>Task1</h1>
        <div v-for="task in tasks"  v-bind:key="task.id">
          <div v-if="task.type == 'task1'">
            <Card v-bind:task="task"></Card>
          </div>
        </div>
         <button type="submit">Feladatok Kiértékelése</button>
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
    }
}

</script>

<style lang = "scss" scoped>
.bg-img{
background-color:whitesmoke;
max-width:500px;
margin-left:auto;
margin-right:auto;  
padding:5%;
border-radius:10px;
}
.container{
  width:500px;
  background-color:white;
  margin-left: auto;
  margin-right:auto;
}

</style>