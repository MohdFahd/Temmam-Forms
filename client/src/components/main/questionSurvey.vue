<template>
  <div
    @mouseup="focus = true"
    @mouseleave="focus = false"
    @click.once="exportQuestion"
    class="px-4 rounded-lg dark:border-gray-700 mt-5"
    :class="{ 'border-l-4 border-l-secondary': focus }"
  >
    <el-row>
      <el-col :span="16"
        ><div class="grid-content ep-bg-purple" />
        <input
          type="text"
          class="w-full text-lg text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
          placeholder="Enter your Question..."
          v-model="Question.questionName"
        />
      </el-col>
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple-light" />
        <el-select
          class="ms-14 mt-3"
          v-model="Question.type"
          style="width: 240px"
        >
          <!-- <el-option selected label="Multiple choice" value="Multiple choice" /> -->

          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :teleported="true"
          />
        </el-select>
      </el-col>
    </el-row>
    <!-- Question -->
    <div>
      <el-row v-if="Question.type === 'Multiple choice'">
        <el-col
          :span="24"
          class="flex items-center"
          @keyup.enter="numOfOption++"
          v-for="i in numOfOption"
          :key="i"
        >
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#dbd9d2"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
          </div>
          <input
            type="text"
            :class="{ 'border-b-2': focus }"
            class="w-full text-primary focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            v-model="Question.options[i - 1]"
            placeholder="Enter your Description..."
          />
          <button @click="numOfOption--" v-show="focus == true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="me-5"
              width="15px"
              viewBox="0 0 448 512"
            >
              <path
                fill="#cdd2db"
                d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"
              />
            </svg>
          </button>
        </el-col>
        <el-col
          :span="24"
          v-show="Question.addOthers"
          class="flex items-center"
        >
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#dbd9d2"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="w-full text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Others..."
          />
          <br />
          <button @click="Question.addOthers = false">
            <svg
              class="me-5"
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 448 512"
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </button>
        </el-col>
        <el-col :span="24" class="flex items-center" v-show="focus == true">
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#dbd9d2"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
          </div>
          <input
            @click="numOfOption++"
            type="text"
            class="w-25 text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Add another"
          />

          <h1 v-show="!Question.addOthers" class="mt-5">
            or
            <span
              @click="Question.addOthers = true"
              class="text-primary text-sm font-bold cursor-pointer"
              >Add Others</span
            >
          </h1>
          <br />
        </el-col>

        <hr class="border-b border-gray-300 my-4" />
      </el-row>
      <!-- Paragraph -->
      <el-row v-else-if="Question.type === 'Paragraph'">
        <el-col :span="24" class="flex items-center my-4">
          <input
            disabled
            class="w-full text-sm bg-transparent text-primary border-b-2 border-dashed focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            type="text"
            placeholder="Long answer text..."
          />
        </el-col>
      </el-row>
      <!-- CheckBoxes -->
      <el-row v-else-if="Question.type === 'CheckBoxes'">
        <el-col
          :span="24"
          class="flex items-center"
          @keyup.enter="numOfOption++"
          v-for="i in numOfOption"
          :key="i"
        >
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 448 512"
            >
              <path
                fill="#d5dae1"
                d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="w-full text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            value="Option 1 "
            placeholder="Enter your Description..."
          />
          <button @click="numOfOption--">
            <svg
              class="me-5"
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 448 512"
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </button>
        </el-col>
        <el-col
          :span="24"
          v-show="Question.addOthers"
          class="flex items-center"
        >
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#dbd9d2"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="w-full text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Others..."
          />
          <br />
        </el-col>
        <el-col :span="24" class="flex items-center">
          <div class="grid-content ep-bg-purple-dark my-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#dbd9d2"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
          </div>
          <input
            @click="numOfOption++"
            type="text"
            class="w-25 text-primary border-b-2 focus:outline-none focus:border-b-2 p-2 focus:border-primary"
            placeholder="Add another"
          />

          <h1 v-show="!Question.addOthers" class="mt-5">
            or
            <span
              @click="Question.addOthers = true"
              class="text-primary text-sm font-bold cursor-pointer"
              >Add Others</span
            >
          </h1>
          <br />
        </el-col>
      </el-row>

      <!-- This is line between is static for all option -->
      <hr class="border-b border-gray-300 bg-black mt-10" />
      <el-row class="mt-5" v-show="focus == true">
        <el-col :span="24" class="flex items-center">
          <div class="grid-content ep-bg-purple-dark"></div>
          <div class="flex-grow"></div>
          <h1 class="text-gray-500 mx-3">Required</h1>
          <el-switch v-model="Question.require" />
          <div class="border-l border-gray-300 h-6 mx-4"></div>
          <el-button class="bg-transparent" :icon="Delete"></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";
const options = [
  {
    value: "Multiple choice",
    label: "Multiple choice",
  },
  {
    value: "Paragraph",
    label: "Paragraph",
  },
  {
    value: "CheckBoxes",
    label: "CheckBoxes",
  },
];

const addOthers = ref(false);
const numOfOption = ref(1);

const focus = ref(false);
const Question = ref({
  questionName: "Untitled Question",
  require: false,
  options: ["Option"],
  type: "Multiple choice",
  addOthers: false,
});

// const fireFunction = () => {
//   form.questions.push(Question.value); // Push the question to the Form's questions array
// };
const { form, numOfQuestion } = defineProps({
  form: Object,
  numOfQuestion: Number,
});

const exportQuestion = () => {
  form.questions.push(Question.value); // Push the question to the Form's questions array
};
watch(Question, () => {
  exportQuestion;
});
</script>

<style></style>
