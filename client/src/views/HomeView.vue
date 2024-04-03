<template>
  <layout>
    <div class="p-4 sm:ml-64">
      <nav class="my-5 flex justify-end items-end">
        <router-link to="/form">
          <el-button color="#0F113C">
            <span class="mx-2">New Form</span>
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
        </router-link>

        <div class="border-l border-gray-300 h-10 mx-4"></div>

        <div class="">
          <img
            src="https://i.pravatar.cc/40?img=21"
            class="rounded-full me-5"
            alt=""
          />
        </div>
      </nav>
      <div
        class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700 my-5"
      >
        <h1 class="text-xl font-bold my-5">All Froms</h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Form name</th>
                <th scope="col" class="px-6 py-3">Created at</th>
                <th scope="col" class="px-6 py-3">Ended at</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="Form in Forms"
                :key="Form.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ Form.id }}
                </th>
                <td class="px-6 py-4">{{ Form.title }}</td>
                <td class="px-6 py-4">{{ Form.created_at }}</td>
                <td class="px-6 py-4">{{ Form.end_at }}</td>
                <td class="px-6 py-4">
                  <router-link
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    :to="'/resForm/' + Form.id"
                  >
                    View
                  </router-link>
                </td>
                <td class="px-6 py-4">
                  <router-link
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    :to="'/answers/' + Form.id"
                  >
                    Responses
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </layout>
</template>
<script setup>
import headerFrom from "@/components/main/headerFrom.vue";
import layout from "./layouts/layout.vue";
import questionSurvey from "@/components/main/questionSurvey.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const Forms = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/admin/getForms");
    // Update Form with the retrieved data
    Forms.value = response.data.forms;
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  }
});
</script>
