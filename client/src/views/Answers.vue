<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">User</th>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="question in questions"
            :key="question"
          >
            {{ question }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="answer in Answers"
          :key="answer"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ answer.user_name }}
          </th>
          <td
            class="px-6 py-4"
            v-for="qesAns in answer.questions"
            :key="qesAns"
          >
            {{ qesAns.answers }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const Answers = ref({});
const $route = useRoute();
const id = $route.params.id;

let questions = [];

onMounted(() => {
  axios
    .get(`http://localhost:3000/admin/getResponse/${id}`)
    .then((response) => {
      // Update Answers with the retrieved data
      Answers.value = response.data.data;

      // Fetch all questionNames for the first user
      const firstUser = Object.values(Answers.value)[0];
      if (firstUser && firstUser.questions) {
        questions = firstUser.questions.map(
          (question) => question.questionName
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
});
</script>

<style></style>
