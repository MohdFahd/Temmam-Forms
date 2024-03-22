<template>
  <div class="p-4 sm:ml-64">
    <nav class="my-5 flex justify-end items-end">
      <el-button color="#0F113C" :dark="isDark" @click="numOfQuestion++">
        <span class="mx-2">Add</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          viewBox="0 0 448 512"
        >
          <path
            fill="#bbd115"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </el-button>
      <el-button color="#0F113C" :dark="isDark">Save</el-button>
    </nav>
    <div
      class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700"
    >
      <headerFrom />
    </div>
    <div v-for="Q in numOfQuestion" :key="Q">
      <questionSurvey :form="Form" :numOfQuestion="numOfQuestion" />
    </div>
  </div>
</template>
<script setup>
import headerFrom from "@/components/main/headerFrom.vue";
import questionSurvey from "@/components/main/questionSurvey.vue";
import { ref, watch } from "vue";

const numOfQuestion = ref(1);

const Form = ref({
  title: "Untitled form",
  description: "",
  questions: [],
});
</script>
