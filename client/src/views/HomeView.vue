<template>
  <div class="p-4 sm:ml-64">
    <nav class="my-5 flex justify-end items-end">
      <el-button color="#0F113C" @click="numOfQuestion++">
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
      <el-button color="#0F113C">
        <span class="mx-2">Save</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          viewBox="0 0 448 512"
        >
          <path
            fill="#50db14"
            d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
          />
        </svg>
      </el-button>
      <div class="border-l border-gray-300 h-10 mx-4"></div>

      <div class="">
        <img
          src="https://i.pravatar.cc/40?img=3"
          class="rounded-full me-5"
          alt=""
        />
      </div>
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
