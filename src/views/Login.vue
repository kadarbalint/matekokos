<template>
  <div class="bg-img">
    <div class = "container">
      <form @submit.prevent="pressed">
          <div class ="login">
          <input type = "email" placeholder="Email cím" v-model="email">
          </div>
          <div class ="password">
          <input type = "password" placeholder="Jelszó" v-model = "password">
          </div>
          <button type ="submit">Bejelentkezés</button>
      </form>
     
  <div class ="error" v-if ="error"> {{error.message}}</div>
<span>Ide kattintva tudsz <router-link to="/Register" >Regisztrálni</router-link></span>
 </div>
</div>
</template>

<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
   data(){
    return{
    email:'',
    password:'',
    error:''
    }
  },
  methods:{
  async pressed(){
    
    try{
     const val = await firebase.auth().signInWithEmailAndPassword(this.email,this.password)  
    console.log(val)
    this.$router.replace({name:"Main_page"})
    }
    catch(error){
      console.log(error)
    }
  }
  }
 
}


</script>

<style lang = "scss" scoped>

/*.bg-img{
  background: url('hatter.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.logo{
  text-align:center;
  font-size:40px;
  font-family: Georgia, serif;
  color:#66a3ff;

}
*/
.container{
  
  background-color:white;
  width: 350px;
  margin-left: auto;
  margin-right:auto;
}

.error {
  color: red;
  font-size: 18px;
}
input {
  width: 200px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 200px;
  height: 75px;
  font-size: 100%;
}
</style>