<template>
  <div class ="background">
    <div class="logoo">
      <img class="logo" src ="./logo.jpg">
    </div>
      <div  v-if="loggedIn">Be vagy jelentkezve</div>
      <div  v-else>Nem vagy bejelentkezve</div>
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


<style lang = "scss" scoped>

.logo{
  max-height:150px;
    
}
.logoo{
   margin-left: auto;
  margin-right:auto;
}
.background{
 width:auto;

}
@media screen and (max-width:600px){
    .logo{
        max-width:320px;
    }
}

</style>