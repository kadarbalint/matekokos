<template>
    <div class = "bg-img">
         <top-header></top-header>
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
        <h1>Feladatok törlése</h1>
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
import firebase from "firebase";


export default{
    components: {
      'top-header':TopHeader,
        Card
    },
    data () {
    return {
      tasks: [],
        admins:[],
        show:"",
    }},
    mounted(){
        this.getCollection('tasks');
         this.isAdmin();
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
        this.getCollection('tasks');
}).catch((error) => {
    console.error("Error removing document: ", error);
});
    },
        
     async isAdmin() {
     this.show = false;
      let snapshot = await db.collection("admins").get();
      let currentUser = firebase.auth().currentUser;
      snapshot.forEach(admin => {
        let data=admin.data();
       
        if (data.email === currentUser.email) {
         this.show = true;
        }
      }) ;
      if (!this.show){
                 console.log(this.show);
        this.$router.replace({name:"Main_page"}) 
                    }
    }
  }
}


</script>

<style lang = "scss" scoped>
.bg-img{
background-color:white;

}
.container{
  
  background-color:whitesmoke;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

 border-radius: 10px;
max-width:500px;
padding:5%;
margin-left:auto;
margin-right:auto;
}
button {
  max-width: 300px;
  height: 30px;
  font-size: 100%;
  border-radius:5px;
  margin-top:10px;
  margin-bottom:10px;
}
</style>