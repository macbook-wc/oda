<script setup>
import { RouterView } from "vue-router";
import Header from "./views/component/header.vue";
import Footer from "./views/component/footer.vue";
</script>

<template>
  <Header></Header>
  <div class="mainPage">
    <RouterView />
  </div>

  <Footer></Footer>
</template>

<style scoped>
.mainPage {
  min-height: -moz-calc(100vh - 100px);
  min-height: -webkit-calc(100vh - 100px);
  min-height: calc(100vh - 100px);
}
</style>
