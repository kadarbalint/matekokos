<template>
<div class = "bg-img">
              <top-header></top-header>
        <h1><router-link to="/Main_Page">Vissza</router-link></h1>
    <div class ="container">
       <form @submit.prevent="pressed">
      <h1>Adminisztrátor felvétele</h1>
      <div>
       
       <div>
       <input type="text" v-model="email" placeholder="Admin e-mail cím" />
      </div>
      <br />
      <button type="submit">Adminisztrátor hozzáadása</button>
      </div>
    </form>
    <h2 v-if="status">Admin hozzáadva
    </h2>
    </div>
    </div>
</template>

<script>
import { db } from "../main";
import TopHeader from "../components/Top-Header.vue";
import firebase from "firebase";

export default {
  components: {
      'top-header':TopHeader,
  },
  data() {
    return {
           type:"",
      status: "",
      admins:[],
      show:"",
    };
  },
  mounted(){      
       this.isAdmin();
    },
  methods: {
    pressed() {
      db.collection("admins")
        .add({
           email:this.email,
        })
        .then(ref => {
          this.status = ref.id;
           this.$router.go()
        })
        .catch(/*err*/ () => {});
      setTimeout(() => {
        this.status = "";
      }, 5000);
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
  },
}
</script>


<style lang = "scss" scoped>
.bg-img{
  background-color:white;
}
.container{
  
  background-color:whitesmoke;
  margin-left: auto;
  margin-right:auto;
  max-width:500px;
  padding:5%;
  border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}

input {
  
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  max-width: 300px;
  height: 30px;
  font-size: 100%;
  border-radius:5px;
}
</style>