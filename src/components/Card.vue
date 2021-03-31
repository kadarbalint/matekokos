<template>
   <div class="container">
    <p>{{task.question}}</p>
    <div v-katex="task.katex"></div>
    <div class ="container.kep" v-if="task.img">
     <img v-bind:src="task.img"> 
    </div>
    <form>
      <div class="select" v-for=" (answear,index) in task.answears" :key="answear">
        <input type="radio" :id="answear" :value="index" v-on:input="pick">
        <label> <span v-katex="answear"> </span> </label>
        <br>
      </div>
    </form>
  </div>
</template>

<script>
export default{
  props: ['task'],
  data: () => ({
    picked: "nincs",
  }),
  methods: {
    pick(event){
      this.picked = event.target.value;
      this.$emit('chose', this.picked, this.task.id);
    }
  }
}
  
</script>

<style scoped>

.container.kep{
  width:300px;
}
.select{
  text-align:left;
  margin-left:20%;
}
.container{
  background-color:whitesmoke;
  border-radius:10px;

}
</style>