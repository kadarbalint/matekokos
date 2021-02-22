<template>
<div class = "bg-img">
    <h1><router-link to="/Main_Page">Vissza</router-link></h1>
    <form @submit.prevent="pressed">
      <div class ="container">
      <h1>Feladat Feltöltése</h1>
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
export default {
  data() {
    return {
       difficulty:"",
         solution:"",
           katex: "",
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


<style>
.bg-img{
background: rgb(63,127,251);
background: linear-gradient(0deg, rgba(63,127,251,1) 0%, rgba(255,255,255,1) 65%);
}
.container{
  
  background-color:white;
  width: 250;
  margin-left: auto;
  margin-right:auto;
}

input {
  width: 200px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
</style>