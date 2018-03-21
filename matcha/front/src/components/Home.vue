<template>
  <div class="home">
    <Header></Header>
    <sign-up></sign-up>
  <footer>TEST</footer>
  </div>
</template>

<script>
import Header from './Header';
import SignUp from './SignUp';

export default {
  name: 'Home',
  components: {
    Header,
    SignUp
  }
}
</script>

<style scoped>

</style>
