<template>
  <el-table
    :data="Answers"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column
      v-for="(value, key) in Answers[0]"
      :key="key"
      :prop="key"
      :label="key"
    />
  </el-table>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const Answers = ref([]);
const $route = useRoute();
const id = $route.params.id;
const questions = ref([]);

onMounted(() => {
  axios
    .get(`http://localhost:3000/admin/getResponse/${id}`)
    .then((response) => {
      // Update Answers with the retrieved data
      Answers.value = response.data.data;

      // Extract unique question names
      const uniqueQuestions = [
        ...new Set(response.data.data.map((item) => item.questionName)),
      ];
      // Construct array of columns for table headers
      questions.value = uniqueQuestions.map((questionName) => ({
        id: questionName,
        questionName,
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
});

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any;
  rowIndex: number;
}) => {
  // Add row class logic if needed
};
</script>

<style></style>
