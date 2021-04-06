<template>
        <div>
        <top-header></top-header>
         <div class = "bg-img">
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
        <h1>Függvények határértéke</h1>
      <div v-if="redOrGreen.length == 0">
          <div v-for="task in tasks"  v-bind:key="task.id">
            <div v-if="task.type == 'Függvények'">
              <Card @chose="answer" v-bind:task="task"></Card>
            </div>
          </div>
      </div>
      <div v-if="redOrGreen.length != 0">
          <div v-for="(task, index) in tasks"  v-bind:key="task.id">
            <div v-if="task.type == 'Függvények' && redOrGreen[index]==0">
              <Card style="background-color: green" @chose="answer" v-bind:task="task"></Card>
            </div>
            <div v-if="task.type == 'Függvények' && redOrGreen[index]==1">
              <Card style="background-color: red" @chose="answer" v-bind:task="task"></Card>
            </div>
          </div>
      </div>
         <button type="submit" v-on:click="evaluate">Feladatok Kiértékelése</button>
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
      tasks: [],
      userAnswers: [],
      redOrGreen: []
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
    evaluate(){
      for(let i = 0; i < this.tasks.length; i++){
        for(let [key, value] of Object.entries(this.userAnswers)){
          if(key==this.tasks[i].id){
            if(value==this.tasks[i].solution)
            {
              this.points +=1;
              this.redOrGreen.push(0);
              console.log(this.redOrGreen);
            } else {
              this.redOrGreen.push(1);
              console.log(this.redOrGreen);
            }
          }
        }
      }
    },
    answer(value, id){
      console.log(value, id);
      this.userAnswers[id] = value;
      console.log(this.userAnswers);
    }
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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}
.container{
  max-width:500px;
  background-color:white;
  margin-left: auto;
  margin-right:auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}
.wrongAnswer{
  background-color: red;
}

</style>