<template>
  <div>
      <div class ="bg-img">
        <div class = "container">
        <span>
           <img src="./300.png">
        <h1><router-link to="/task1">task1</router-link></h1>
        </span>
        <span>
            <img src="./300.png">
        <h1><router-link to="/task2">Task2</router-link></h1>
        </span>
        </div>
        <div>
        <span><h1><router-link to="/addtask">Feladat Hozzáadása</router-link></h1></span>
        <span><h1><router-link to="/deletetask">Feladat Törlése</router-link></h1></span>
        </div>
      </div>
   </div>
</template>

<script>
import { db } from "../main";
export default {
name: "home",
  components: {
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
 background: rgb(63,127,251);
background: linear-gradient(0deg, rgba(63,127,251,1) 0%, rgba(255,255,255,1) 65%);

}
.container {
  display: flex; /* or inline-flex */
 justify-content: space-around;
 flex-wrap:wrap;
}
</style>