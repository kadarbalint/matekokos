<template>
<div class = "bg-img">
              <top-header></top-header>
    <h1><router-link to="/Main_Page">Vissza</router-link></h1>
    <form @submit.prevent="pressed">
      <div class ="container">
      <h1>Feladat Feltöltése</h1>
      <div>
      <a v-bind:href="'https://katex.org/docs/supported.html'">Katex Segítség</a>
      </div>      
       <div>
        <label>Kérdés:</label>
       </div>
       <div>
                 <input type="text" v-model="question" placeholder="Feladat Kérdése?" />
      </div>
      <div >
        <label>Feladat Szövege:</label>
      </div>
      <div>
        <input type="text" v-model="katex" placeholder="Latex formátumba" />
      </div>
       <div >
        <label>Kép linkje:</label>
      </div>
      <div>
        <input type="text" v-model="img" placeholder="Kép linkje" />
      </div>
         <div v-katex="katex"></div>
         <div>
          <label>Feladat típusa:</label>
         </div>
         <div>
      <select v-model="type">
        <option>task1</option>
        <option>task2</option>
      </select>
      </div>
  
 
          <p>Válaszlehetőségek:</p>
       <label>A:</label>
        <input type="text" v-model="answear[0]" placeholder="A válasz:" />
         <div v-katex="answear[0]"></div>
         <div class="row">
        <label>B:</label>
        <input type="text" v-model="answear[1]" placeholder="B válasz:" />
         <div v-katex="answear[1]"></div>
        </div>
         <div class="row">
        <label>C:</label>
        <input type="text" v-model="answear[2]" placeholder="C válasz:" />
         <div v-katex="answear[2]"></div>
        </div>
         <div class="row">
        <label>D:</label>
        <input type="text" v-model="answear[3]" placeholder="D válasz:" />
         <div v-katex="answear[3]"></div>
        </div>
      <label>Helyes Válasz:</label>
      <select v-model="solution">
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
      </select>
      <div>
             <br />
       <label>Nehézség:</label>
      <select v-model="difficulty">
        <option>Könnyű</option>
        <option>Közepes</option>
        <option>Nehéz</option>
      </select>
      </div>
      <br />
      <button type="submit">Feladat Feltöltése</button>
      </div>
    </form>
    <h2 v-if="status">Feladat Feltöltve
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
       difficulty:"",
         solution:"",
           katex: "",
           img:"",
           type:"",
      question: "",
     // image: "",
      answear:[],
      status: ""
    };
  },
  methods: {
    pressed() {
      db.collection("tasks")
        .add({
           type:this.type,
            difficulty: this.difficulty,
            solution:this.solution,
              katex: this.katex,
              img:this.img,
          question: this.question,
          answears: this.answear,
        
          

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