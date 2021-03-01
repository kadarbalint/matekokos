<template>
      <div class ="bg-img">
     <div class="flex">
       <div class="logo">
      <img src ="../assets/logo.jpg">
    </div>
      <div class="container">
      <form @submit.prevent ="pressed">
          <div class ="email">
              <input type ="email" v-model="email" placeholder="Email cím">
          </div>
          <div class ="password">
              <input type ="password" v-model="password" placeholder="Jelszó">
          </div>
           <div v-if="error" class="error">{{error.message}}</div>
          <button type="submit"> Regisztrálj</button>
      </form>
      </div>
      </div>
      </div>
</template>

<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
export default{
 methods: {
      async pressed() {
       firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "Main_page" });
        })
        .catch(error => (this.error = error));
       }
 },
    


    
    data(){
         return{
            email:"",
            password:'',
            error:''
          }
          }
        }

</script>

<style lang = "scss" scoped>
.bg-img{
    background-color:white;
    
}
.flex{
 display: inline-flex; /* or inline-flex */
 justify-content:center;
 flex-wrap:wrap;
}
.logo{
  height:150px;
  margin-top:10%;
}
.error {
  color: red;
  font-size: 18px;
}
.container{
  
  background-color:whitesmoke;
  max-width:500px;
  border-radius:10px;
  padding:5%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


}
input {
  width: 300px;
  height: 75px;
  font-size: 100%;
  border-radius:5px;
  margin:10px;


}
button {
  width: 300px;
  height: 75px;
  font-size: 100%;
  border-radius:5px;
}
</style>