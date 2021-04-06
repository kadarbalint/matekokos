<template>
   <div class="container">
    <p>{{task.question}}</p>
    <div v-katex="task.katex"></div>
    <div class ="container.kep" v-if="task.img">
     <img v-bind:src="task.img"> 
    </div>
    <form class="select">
    <input type="radio" id=task.answears[0] value="0" v-model="picked" v-on:input="pick">
<label for=task.answears[0]><span v-katex="task.answears[0]"> </span></label>
<br>
<input type="radio" id=task.answears[1] value="1" v-model="picked" v-on:input="pick">
<label for=task.answears[1]><span v-katex="task.answears[1]"> </span></label>
<br>
<input type="radio" id=task.answears[2] value="2" v-model="picked" v-on:input="pick">
<label for=task.answears[2]><span v-katex="task.answears[2]"> </span></label>
<br>
<input type="radio" id=task.answears[3] value="3" v-model="picked" v-on:input="pick">
<label for=task.answears[3]><span v-katex="task.answears[3]"> </span></label>
<br>
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
}
.container{
    padding:3%;
  background-color:whitesmoke;
  border-radius:10px;

}
</style>