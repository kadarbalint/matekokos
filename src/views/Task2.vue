<template>
        <div>
        <top-header></top-header>
         <div class = "bg-img">
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
        <h1>Függvények határértéke</h1>
       
         <div>
      </div>
        <div>
          <h2 >Nehézség:</h2>
         </div>
         <div>
      <select @change ="onChange()" v-model="hardness" >
        <option>Könnyű</option>
        <option>Nehéz</option>
      </select>
      </div>
          <div v-for="task in tasks" v-bind:key="task.id">
      <div v-if="task.type == 'Függvények' && task.hardness == hardness">
              <Card @chose="answer" v-bind:task="task" v-if="typeof redOrGreen[task.id] == 'undefined'"></Card>
              <Card style="background-color: green" @chose="answer" v-bind:task="task" v-if="redOrGreen[task.id] === true"></Card>
              <Card style="background-color: red" @chose="answer" v-bind:task="task" v-if="redOrGreen[task.id] === false"></Card>
              <br>
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
      redOrGreen: {},
      hardness: ""
    }},
    mounted(){
      
    },
    methods: {
        onChange(){
      this.getCollection('tasks');
      },
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
      this.points = 0;
      this.tasks.forEach((task) => {
        const answer = this.userAnswers[task.id];
		if(answer==task.solution)
		{
          this.points +=1;
          this.redOrGreen[task.id] = true;
        } else {
          this.redOrGreen[task.id] = false;
        }
      });
      console.log(this.redOrGreen);
      this.$forceUpdate();
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
button {
  max-width: 300px;
  height: 30px;
  font-size: 100%;
  border-radius:5px;
}
select {
  max-width: 300px;
  height: 30px;
  font-size: 100%;
  border-radius:5px;
    margin-bottom:10px;

}
</style>