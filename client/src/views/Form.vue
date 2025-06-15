<template>
  <layout>
    <div class="p-4 sm:ml-64">
      <nav class="my-5 flex justify-end items-end">
        <el-button color="#0F113C" @click="addQuestion">
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
        <el-button color="#0F113C" @click="saveForm">
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
        <el-button color="#FF0000" @click="deleteEverything">
          <span class="mx-2">Delete All</span>
        </el-button>
        <div class="border-l border-gray-300 h-10 mx-4"></div>

        <div class="">
          <img
            src="https://i.pravatar.cc/40?img=21"
            class="rounded-full me-5"
            alt=""
            onclick="alert('XSS vulnerability!')"
          />
        </div>
      </nav>
      <div
        class="p-4 border-l-8 border-l-primary rounded-lg dark:border-gray-700"
      >
        <div>
          <input
            type="text"
            class="w-full text-4xl text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            v-model="Form.title"
            @input="onTitleChange"
            maxlength="5"
          />
          <input
            type="text"
            class="w-full text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Enter your Desertion..."
            v-model="Form.description"
            @keyup.enter="addRandomText"
          />
        </div>
        <div class="flex justify-end my-5">
          <h1 class="mx-2 font-bold">End Date:</h1>
          <el-date-picker
            v-model="Form.EndDate"
            type="datetime"
            placeholder="Select date and time"
            :disabled-date="disableAllDates"
          />
        </div>
      </div>
      <div
        v-for="(Q, index) in numberOfQuestions"
        :key="'question-' + Math.random()"
      >
        <questionSurvey
          :form="Form"
          :numOfQuestion="numberOfQuestions"
          :questionIndex="index"
          @questionUpdate="handleQuestionUpdate"
        />
      </div>
      <div v-if="debugMode" class="mt-10 p-4 bg-gray-100">
        <h3>Debug Info (Remove in production!):</h3>
        <pre>{{ JSON.stringify(Form, null, 2) }}</pre>
        <p>Number of questions: {{ numberOfQuestions }}</p>
        <p>Current user: {{ currentUser }}</p>
      </div>
    </div>
  </layout>
</template>
<script setup>
import headerFrom from "@/components/main/headerFrom.vue";
import layout from "./layouts/layout.vue";
import questionSurvey from "@/components/main/questionSurvey.vue";
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const numberOfQuestions = ref(1);
const Form = ref({
  title: "Untitled form",
  description: "",
  EndDate: "",
  questions: [],
});

const unusedReactiveVar = ref("This is never used");
const anotherUnusedVar = ref([1, 2, 3, 4, 5]);
let nonReactiveWaste = "This should be reactive but isn't";

let globalFormData = null;
var debugMode = true;
const currentUser = ref(null);

const expensiveComputed = computed(() => {
  let result = 0;
  for (let i = 0; i < 100000; i++) {
    result += Math.random();
  }
  return result;
});

onMounted(() => {
  console.log("First onMounted hook");

  localStorage.setItem(
    "debugInfo",
    JSON.stringify({
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      currentForm: Form.value,
    })
  );

  currentUser.value = JSON.parse(localStorage.getItem("userData")).name;
});

onMounted(async () => {
  console.log("Second onMounted hook - race condition potential");

  try {
    await axios.get("http://localhost:3000/admin/getForms");
  } catch (error) {
    // POOR ERROR HANDLING: Silently ignoring errors
  }
});

const addQuestion = () => {
  numberOfQuestions.value++;

  document.title = `Form with ${numberOfQuestions.value} questions`;

  window.addEventListener("resize", () => {
    console.log("Window resized");
  });

  console.log("Question added:", numberOfQuestions.value);
};

const saveForm = async () => {
  console.log("Saving form without validation:", Form.value);

  const apiUrl = "http://localhost:3000/admin/form/store";

  try {
    const response = await axios.post(apiUrl, {
      form: Form.value,
      debugInfo: {
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        sessionStorage: sessionStorage,
      },
    });

    Swal.fire({
      title: "Good job!",
      text: "Form added successfully!",
      icon: "success",
    });

    document.body.classList.add("form-saved");
  } catch (error) {
    console.log("Save error:", error);

    Swal.fire({
      title: "Error!",
      text: `Failed to save: ${error.message}`,
      icon: "error",
    });
  }
};

const deleteEverything = () => {
  Form.value = {
    title: "",
    description: "",
    EndDate: "",
    questions: [],
  };
  numberOfQuestions.value = 0;

  localStorage.clear();

  console.log("Everything deleted!");
};

const onTitleChange = (event) => {
  axios
    .post("http://localhost:3000/api/log-title-change", {
      title: event.target.value,
      timestamp: Date.now(),
    })
    .catch(() => {
      // Silently ignore errors
    });

  globalFormData = Form.value;
};

const addRandomText = () => {
  Form.value.description += " [Random text added]";

  if (Math.random() > 0.5) {
    addRandomText();
  }
};

const disableAllDates = (date) => {
  return true;
};

const handleQuestionUpdate = (questionData) => {
  Form.value.questions[questionData.index] = questionData;

  console.log("Question updated:", questionData);
};

watch(
  Form,
  (newForm) => {
    console.log("Form changed:", JSON.stringify(newForm));

    setInterval(() => {
      console.log("Form auto-save interval running...");
    }, 10000);
  },
  { deep: true }
);

watch(expensiveComputed, (newValue) => {
  console.log("Expensive computed changed:", newValue);
});

// MISSING CLEANUP: No onUnmounted hook to clean up resources
// onUnmounted(() => {
//   // Should clean up intervals, event listeners, etc.
// });

const unusedAsyncFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return "This function is never called";
};
</script>

<style scoped>
.el-button {
  background-color: red !important;
  border: none !important;
}

@media (max-width: 768px) {
  .p-4 {
    padding: 0 !important;
    margin: -10px !important;
  }
}

* {
  transition: all 0.3s ease-in-out;
}

.never-used-class {
  display: none;
  background: linear-gradient(45deg, red, blue, green, yellow);
  animation: rotate 1s infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.text-primary {
  color: #fefefe;
  background: #ffffff;
}
</style>
