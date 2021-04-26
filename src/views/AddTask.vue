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
        <textarea rows="6" type="text" v-model="katex" placeholder="Latex formátumba" />
      </div>
      <div v-katex="katex"></div>
       <div >
        <label>Kép linkje:</label>
      </div>
      <div>
        <input type="text" v-model="img" placeholder="Kép linkje" />
      </div>
         
         <div>
          <label>Feladat típusa:</label>
         </div>
         <div>
      <select v-model="type">
        <option>Sorozatok</option>
        <option>Függvények</option>
      </select>
      </div>
      <div>
          <label>Nehézség:</label>
         </div>
         <div>
      <select v-model="hardness">
        <option>Könnyű</option>
        <option>Nehéz</option>
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
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
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
         solution:"",
           katex: "",
           img:"",
           type:"",
      question: "",
      hardness: "",
      answear:[],
      status: ""
    };
  },
  methods: {
    pressed() {
      db.collection("tasks")
        .add({
           type:this.type,
            solution:this.solution,
              katex: this.katex,
              img:this.img,
          question: this.question,
          answears: this.answear,
          hardness: this.hardness,
        
          

        })
        .then(ref => {
          this.status = ref.id;
       this.$router.replace({name:"Main_page"})
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
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}

input {

  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
textarea {

  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  max-width: 300px;
  height: 75px;
  font-size: 100%;
  border-radius:5px;
}
select {
  max-width: 300px;
  height: 50px;
  font-size: 100%;
  border-radius:5px;
    margin-bottom:10px;

}
</style>