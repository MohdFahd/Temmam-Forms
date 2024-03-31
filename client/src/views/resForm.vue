<template>
  <div class="p-5">
    <div
      class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700 my-5"
    >
      <h1 class="text-3xl my-2">Contact information</h1>
      <hr class="border-b border-gray-300 bg-black my-5" />
      <p class="text-lg text-gray-600">
        Email:
        <span class="text-primary font-bold">mmahmmad3878@gmail.com</span>
      </p>
    </div>
    <div
      class="p-4 border-2 border-primary border-dashed rounded-lg dark:border-gray-700"
    >
      <div
        class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700 my-5"
      >
        <h1 class="text-3xl my-2">{{ formData.title }}</h1>
        <p class="text-lg text-gray-600">{{ formData.description }}</p>
      </div>
      <div
        class="px-4 rounded-lg dark:border-gray-700 mt-5 border-l-4 border-l-secondary"
        v-for="(question, index) in formData.questions"
        :key="index"
      >
        <el-row v-if="question.type == 'Multiple choice'">
          <h1 class="font-bold text-xl">{{ question.questionName }} ?</h1>
          <el-col
            :span="24"
            class="flex items-center"
            v-for="(option, index) in question.options"
            :key="index"
          >
            <el-radio
              v-model="question.Answer"
              :label="option"
              size="large"
              @change="updateAnswer(question, option)"
            >
              {{ option }}
            </el-radio>
          </el-col>
          <input
            v-if="question.addOthers == 1"
            type="text"
            class="w-full text-lg text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Enter your Question..."
          />
        </el-row>
        <el-row v-if="question.type === 'CheckBoxes'">
          <h1 class="font-bold text-xl">{{ question.questionName }} ?</h1>
          <el-col
            :span="24"
            class="flex items-center"
            v-for="(option, index) in question.options"
            :key="index"
          >
            <el-checkbox
              v-model="question.Answer"
              :label="option"
              size="large"
              @change="updateAnswer(question, index)"
            >
              {{ option }}
            </el-checkbox>
          </el-col>
          <input
            v-if="question.addOthers === 1"
            type="text"
            class="w-full text-lg text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Others.."
          />
        </el-row>
        <el-row class="w-full" v-if="question.type == 'Paragraph'">
          <h1 class="font-bold text-xl mb-3">{{ question.questionName }} ?</h1>
          <el-col :span="24" class="flex items-center w-full bg-black">
            <input
              type="text"
              class="w-full text-lg text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
              v-model="question.Answer"
              placeholder="Enter your Question..."
            />
          </el-col>
        </el-row>
      </div>
      <hr class="border-b border-gray-300 bg-black my-5" />
      <el-button class="p-4" color="#0F113C">
        <span class="mx-2" @click="onSend">Send</span>
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
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  methods: {
    updateAnswer(question, option) {
      if (!question.Answer) {
        question.Answer = []; // Initialize the answer array if it's not already initialized
      }
    },
  },
  setup() {
    const $route = useRoute();
    const id = $route.params.id;
    const formData = ref({});
    const answers = ref({
      radio: "",
    });

    const onSend = () => {
      axios
        .post("http://localhost:3000/admin/form/responseSubmission", {
          form: formData.value,
        })
        .then((response) => {
          // Handle the response from the server
          Swal.fire({
            title: "Good job!",
            text: response.data.message, // Access the message from the response
            icon: "success",
          });
          // Optionally, you can perform additional actions with the response data
          console.log("Response data:", response.data);

          // Redirect the user to the home page
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    };

    // Use onMounted to fetch data when the component is mounted
    onMounted(() => {
      axios
        .get(`http://localhost:3000/user/form/response/${id}`)
        .then((response) => {
          // Update formData with the retrieved data
          formData.value = response.data.data;

          // Iterate over each question in the formData
          formData.value.questions.forEach((question) => {
            // Add an "Answer" property with a default empty string
            question.Answer = [];
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    });

    return { onSend, formData, answers };
  },
};
</script>

<style></style>
