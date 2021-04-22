<template>
  <div class="flexbox">
    <div class="logo">
      <img class="logo" src ="../assets/logo.jpg">
    </div>
    <div class = "container">
        <form @submit.prevent="pressed">
          <div class ="login">
          <input type = "email" v-model="email" placeholder="Email cím" >
          </div>
          <button type ="submit">Jelszó visszaállítása</button>     
        </form>
<div>Ide kattintva tudsz <router-link to="/" >Bejelentkezni</router-link></div>
<div>Ide kattintva tudsz <router-link to="/Register" >Regisztrálni</router-link></div>
 </div>
 <div v-if="message">{{message}}</div>
</div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
  export default {
      data() {
          return{
              email: "",
              message: ""
          }
      },
      methods: {
          pressed(){
              firebase.auth().sendPasswordResetEmail(this.email)
              .then(()=>{
                this.message="A jelszó visszaállító linket kiküldtük a következő címre: "+this.email;
              })
              .catch((err)=>{
                  this.message=err.message;
              })
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