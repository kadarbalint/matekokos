<template>
  <div>
      <top-header></top-header>
      <div class ="bg-img">
        <div class = "container">
        <div class="wrapper">
           <img class ="img" src="./sorozat.png">
        <h1><router-link to="/task1">Sorozatok</router-link></h1>
        </div>
        <div class="wrapper">
            <img class="img" src="./fuggveny.png">
        <h1><router-link to="/task2">Függvények</router-link></h1>
        </div>  
        <div>
        
        <span><h1><router-link to="/addtask" v-if="isAdmin()" >Feladat Hozzáadása</router-link></h1></span>
        <span><h1><router-link to="/deletetask">Feladat Törlése</router-link></h1></span>
         <span><h1><router-link to="/addadmin">Adminisztrátor felvétele</router-link></h1></span>
        </div>
        </div>
      </div>
   </div>
</template>

<script>
import { db } from "../main";
import TopHeader from "../components/Top-Header.vue";
import firebase from "firebase";
export default {
name: "home",
  components: { 'top-header':TopHeader
  },
  data: () => ({
    types: [],
    page: "main",
  }),
  mounted() {
    this.getCollection("types");
  },
  methods: {
    async getCollection(collectionName) {
      let snapshot = await db.collection(collectionName).get();
      let types = [];
      snapshot.forEach(type => {
        let appData = type.data();
        appData.id = type.id;
        types.push(appData);
      });
      this.types = types;
    },
     async isAdmin() {
      let snapshot = await db.collection("users").get();
      let currentUser = firebase.auth().currentUser;
      snapshot.forEach(users => {
        if (users.email === currentUser.Identifier) {
         return 1;
        }
        else return 0;
      });
    }
   
  }
};

</script>

<style lang = "scss" scoped>
.wrapper{
   background-color:white;
    border-radius:10px;
    padding:5%;

}
.img{
  max-width:200px;
}
.bg-img{
  
 
 background-color:white;


}
.container {
 
  display: flex; /* or inline-flex */
 justify-content: space-around;
 flex-wrap:wrap;
 margin-left: auto;
  margin-right:auto;
   border-radius:10px;
    padding:5%;
    background-color:whitesmoke;
    max-width:500px;
}
</style>