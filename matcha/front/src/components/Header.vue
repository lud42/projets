<template>
  <div class="header">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Matcha'
    }
  }
}
</script>

<style scoped>
h1 {
    background-color: rgba(255, 255, 255, 0.5);
    /* color: white; */
}
</style>
