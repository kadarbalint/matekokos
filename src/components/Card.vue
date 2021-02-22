<template>
  <div class="container">
    <p>{{task.question}}</p>
    <div v-katex="task.katex"></div>
    <div v-for=" answear in task.answears" :key=answear>
      <input type="radio" :id="answear" :value="answear" v-model="picked">
      <label> <span v-katex="answear"> </span> </label>
      <br>
    </div>
  </div>
</template>

<script>
export default{
  props: ['task'],
  data: () => ({
    picked: "nincs",
  }),
}
  
</script>

<style scoped>

</style>