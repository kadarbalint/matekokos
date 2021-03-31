<template>
<div class = "bg-img">
              <top-header></top-header>
    <h1><router-link to="/Main_Page">Vissza</router-link></h1>
    <form @submit.prevent="pressed">
      <div class ="container">
      <h1>Adminisztrátor felvétele</h1>
      <div>
       <div>
        <label>Admin email cím</label>
       </div>
       <div>
       <input type="text" v-model="email" placeholder="Admin e-mail cím" />
      </div>
      <br />
      <button type="submit">Adminisztrátor hozzáadása</button>
      </div>
      </div>
    </form>
    <h2 v-if="status">Admin hozzáadva
    </h2>
</div>
</template>

<script>
import { db } from "../main";
import TopHeader from "../components/Top-Header.vue";
export default {
  components: {
      'top-header':TopHeader,
  },
  data() {
    return {
           type:"",
      status: ""
    };
  },
  methods: {
    pressed() {
      db.collection("users")
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
    }
  }
};
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
}

input {

  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
</style>