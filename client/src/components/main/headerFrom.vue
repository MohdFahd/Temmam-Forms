<template>
  <div>
    <input
      type="text"
      class="w-full text-4xl text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
      v-model="title"
    />
    <input
      type="text"
      class="w-full text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
      placeholder="Enter your Desertion..."
      v-model="description"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const title = ref("Untitled form");
const description = ref("");
</script>

<style></style>
