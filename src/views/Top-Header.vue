<template>
  <div class ="background">
    <span>
      <img class="logo" src ="./logo.jpg">
    </span>
      <span  v-if="loggedIn">Be vagy jelentkezve</span>
      <span  v-else>Nem vagy bejelentkezve</span>
      <span>
          <button @click="signOut">Kijelentkezés</button>
      </span>
  </div>
</template>
<script>

import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    created(){
        firebase.auth().onAuthStateChanged(user=>{
if (user){
    this.loggedIn = true;
}
        })
    },
    data(){
        return{
            loggedIn:false,
        }
        },
    methods:{
       setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
           this.loggedIn = false;
        });
    }
  }
}
</script>

<style>
.logo{
  height:50px;
}
.background{
  width:350px;
  margin-left: auto;
  margin-right:auto;
}


</style>