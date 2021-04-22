<template>
      <div class ="flexbox">
    
       <div class="logo">
       <img class="logo" src ="../assets/logo.jpg">
    </div>
      <div class="container">
      <form @submit.prevent ="pressed">
          <div class ="email">
              <input type ="email" v-model="email" placeholder="Email cím">
          </div>
          <div class ="password">
              <input type ="password" v-model="password" placeholder="Jelszó">
          </div>
          <button type="submit"> Regisztrálj</button>
      </form>
       <div class ="error" v-if ="error"> {{error.message}}</div>
<span>Már regisztráltál? <router-link to="/" >Bejelentkezés</router-link></span>
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
.logo{
 max-width:500px;
  margin-top:5%;
}

.bg-img{
  background-color:white;
}
.container{
  background-color:whitesmoke;
  max-width:500px;
  border-radius:10px;
  padding:5%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


}
.flexbox {
  max-width:1000px;
  padding:10%;
  border-radius:10px;
   flex-direction: row;
  display:flex; 
 justify-content:center;
 flex-wrap:wrap;
 margin-left:auto;
 margin-right:auto;
 
}

.error {
  color: red;
  font-size: 18px;
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
@media screen and (max-width:600px){
    .logo{
        max-width:320px;
    }
}
@media screen and (max-width:321px){
  .kep{
  max-width:300px;
}
}
</style>