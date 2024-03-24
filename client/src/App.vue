<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

// Determine if the current route is the login route
const route = useRoute();
// const isLogin = route.name === "login";
const isLogin = false;
</script>

<style scoped>
/* Your scoped styles here */
</style>
