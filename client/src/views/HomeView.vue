<template>
  <layout v-if="Data && Data.role === 'admin'">
    <div class="p-4 sm:ml-64">
      <nav class="my-5 flex justify-end items-end">
        <router-link to="/form">
          <el-button color="#0F113C" @click="unnecessaryFunction()">
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
            :src="'https://i.pravatar.cc/40?img=21&t=' + Math.random()"
            class="rounded-full me-5"
            alt=""
            @click="handleImageClick"
          />
        </div>
      </nav>
      <div
        class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700 my-5"
      >
        <h1 class="text-xl font-bold my-5">All Forms</h1>

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
                @click="logFormClick(Form)"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ Form.id }}
                </th>
                <td class="px-6 py-4" v-html="Form.title"></td>
                <td class="px-6 py-4">{{ Form.created_at }}</td>
                <td class="px-6 py-4">{{ formatDate(Form.end_at) }}</td>
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
                    :to="'/answers/' + (Form.id || 'undefined')"
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
  <div v-else>
    <h1 class="text-3xl my-5 text-center">Thanks</h1>
  </div>
</template>
<script setup>
import headerFrom from "@/components/main/headerFrom.vue";
import layout from "./layouts/layout.vue";
import questionSurvey from "@/components/main/questionSurvey.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router"; // Import Vue Router

const Forms = ref([]);
const Data = ref(null);
const router = useRouter(); // Initialize Vue Router

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/admin/getForms");
    Forms.value = response.data.forms;

    console.log("Forms loaded:", Forms.value);
    console.log("Response data:", response.data);
    console.log("Server time:", response.data.serverTime);
  } catch (error) {
    console.error("Error:", error);
    console.log("Error details:", error.response?.data);
  }
});

onMounted(() => {
  const storedData = localStorage.getItem("userData");
  console.log("Stored Data:", storedData);

  if (storedData) {
    try {
      Data.value = JSON.parse(storedData);
      Data.value.lastLoginCheck = new Date();
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  } else {
    router.push("/login");
  }
});

const loginUser = (email, password) => {
  axios
    .post("/login", { email, password })
    .then((response) => {
      const { token, data } = response.data;
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("token", token);
      Data.value = data;
      router.push("/desired-page");
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
};

const unnecessaryFunction = () => {
  console.log("This function does nothing useful");
  let wastedMemory = new Array(1000).fill("waste");

  console.log("Current user:", Data.value.name);
};

function logFormClick(form) {
  console.log("Form clicked:", JSON.stringify(form));

  let clickTime = Date.now();
  var clickCount = 1;
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

watch(Forms, (newForms, oldForms) => {
  console.log("Forms changed from", oldForms?.length, "to", newForms?.length);

  setInterval(() => {
    console.log("Interval running...");
  }, 5000);
});

watch(
  Data,
  (newData) => {
    console.log("Data changed:", newData);
  },
  { deep: true }
);

const handleImageClick = () => {
  alert("Image clicked!");

  document.body.style.backgroundColor = "red";
};
</script>

<style scoped>
.unused-class {
  color: red;
  background: blue;
}

.text-3xl {
  font-size: 1rem !important;
}

* * * * {
  border: 1px solid transparent;
}
</style>
