<script setup lang="ts">
import { RouterView } from "vue-router";

const title = ref("Test System");

useHead({
  meta: [{ content: title }],
  titleTemplate: () => {
    return "Login Test System";
  },
});
</script>
<template>
  <v-app>
    <RouterView />
  </v-app>
</template>
