<template>
  <div>
      <top-header></top-header>
      <div class ="bg-img">
        <div class = "container">
        <div class="wrapper">
           <img class ="img" src="../assets/sorozat.png">
        <h1><router-link to="/task1">Sorozatok</router-link></h1>
        </div>
        <div class="wrapper">
            <img class="img" src="../assets/fuggveny.png">
        <h1><router-link to="/task2">Függvények</router-link></h1>
        </div>  
        <div class="wrapper" v-if=show>
        <span><h1><router-link to="/addtask">Feladat Hozzáadása</router-link></h1></span>
        <span><h1><router-link to="/deletetask">Feladat Törlése</router-link></h1></span>
         <span><h1><router-link to="/addadmin">Admin</router-link></h1></span>
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
    page: "main",
     show: false,
     admins:[]
  }),
  mounted() {
    this.isAdmin();

  },
  methods: {
       async isAdmin() {
      let snapshot = await db.collection("admins").get();
      let currentUser = firebase.auth().currentUser;
      snapshot.forEach(admin => {
        let data=admin.data();
        if (data.email === currentUser.email) {
          this.show = true;
        }
      });
    }
  }
  
};

</script>

<style lang = "scss" scoped>
.wrapper{
  margin-top:5%;
  max-width:210px;
   background-color:white;
    border-radius:10px;
    padding:3%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


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
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}
@media screen and (max-width:600px){
    .logo{
        max-width:350px;
    }
}
</style>