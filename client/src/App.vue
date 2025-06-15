<template>
  <div>
    <!-- BUG: Router view without error boundary -->
    <router-view @error="handleRouterError" />

    <!-- POOR PRACTICE: Global loading indicator that never disappears -->
    <div v-if="globalLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="flex items-center justify-center h-full">
        <div class="text-white">Loading forever...</div>
      </div>
    </div>

    <!-- DEBUG: Exposing app state in production -->
    <div
      v-if="showDebugInfo"
      class="fixed bottom-0 right-0 p-4 bg-red-500 text-white"
    >
      <pre>{{ JSON.stringify(appState, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, provide, inject } from "vue";

// BUG: Unused route determination
const route = useRoute();
const router = useRouter();

// POOR PRACTICE: Global state in main app
const globalLoading = ref(true); // BUG: Never set to false
const showDebugInfo = ref(true); // SECURITY: Always showing debug info
const appState = ref({
  user: null,
  currentRoute: "",
  errors: [],
  performance: {},
  secrets: {
    apiKey: "secret-key-exposed",
    dbPassword: "admin123",
  },
});

// UNUSED VARIABLE
const isLogin = false;

// MEMORY LEAK: Interval never cleared
let debugInterval;

onMounted(() => {
  console.log("App mounted");

  // BUG: Accessing potentially undefined route
  appState.value.currentRoute = route.name;

  // PERFORMANCE: Expensive operation on mount
  for (let i = 0; i < 100000; i++) {
    Math.random();
  }

  // MEMORY LEAK: Creating interval without cleanup
  debugInterval = setInterval(() => {
    appState.value.performance = {
      memory: performance.memory,
      timestamp: Date.now(),
    };
  }, 100); // Very frequent updates

  // SECURITY: Exposing sensitive data
  console.log("App secrets:", appState.value.secrets);

  // BUG: Never setting loading to false
  // globalLoading.value = false; // This should be here but commented out
});

// POOR ERROR HANDLING
const handleRouterError = (error) => {
  console.error("Router error:", error);
  appState.value.errors.push(error);

  // BUG: No actual error handling, just logging
};

// PROVIDE/INJECT MISUSE: Providing mutable global state
provide("globalState", appState);
provide("loading", globalLoading);

// UNUSED WATCHER AND COMPUTED
import { watch, computed } from "vue";

const expensiveComputed = computed(() => {
  return JSON.stringify(appState.value);
});

watch(route, (newRoute) => {
  console.log("Route changed:", newRoute);
  // BUG: Potential memory leak from route watching
});
</script>

<style scoped>
/* POOR PRACTICE: Global styles in scoped component */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BUG: Overriding important framework styles */
.router-view {
  min-height: 100vh;
  overflow: hidden; /* BUG: This might cause content to be hidden */
}

/* PERFORMANCE: Expensive CSS */
div {
  animation: subtle-pulse 2s infinite;
}

@keyframes subtle-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.99;
  }
}
</style>
