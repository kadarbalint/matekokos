<template>
  <div>
      <top-header></top-header>
      <div class ="bg-img">
        <div class = "container">
        <span>
           <img src="./200.jpg">
        <h1><router-link to="/task1">Numerikus sorok</router-link></h1>
        </span>
        <span>
            <img src="./200.jpg">
        <h1><router-link to="/task2">Függvények </router-link></h1>
        </span>
        
        <div>
        <span><h1><router-link to="/addtask">Feladat Hozzáadása</router-link></h1></span>
        <span><h1><router-link to="/deletetask">Feladat Törlése</router-link></h1></span>
        </div>
        </div>
      </div>
   </div>
</template>

<script>
import { db } from "../main";
import TopHeader from "../components/Top-Header.vue";
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
   
  }
};

</script>

<style lang = "scss" scoped>
.bg-img{
  
 
 background-color:white;


}
.container {
 
  display: flex; /* or inline-flex */
 justify-content: space-evenly;
 flex-wrap:wrap;
 margin-left: auto;
  margin-right:auto;
   border-radius:10px;
    padding:5%;
    background-color:whitesmoke;
    max-width:500px;
}
</style>