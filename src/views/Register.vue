<template>
      <div class ="bg-img">
      <div v-if="error" class="error">{{error.message}}</div>
      <form @submit.prevent ="pressed">
          <div class ="email">
              <input type ="email" v-model="email" placeholder="Email cím">
          </div>
          <div class ="password">
              <input type ="password" v-model="password" placeholder="Jelszó">
          </div>
          <button type="submit"> Regisztrálj</button>
      </form>
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
  background: url('hatter.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>