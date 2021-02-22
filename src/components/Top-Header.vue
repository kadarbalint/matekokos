<template>
  <div class ="background">
    <div>
      <img src ="./logo.jpg">
    </div>
      <span v-if="loggedIn">Be vagy jelentkezve</span>
      <span v-else>Nem vagy bejelentkezve</span>
      <div>
          <button @click="signOut">Kijelentkezés</button>
      </div>
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

</style>