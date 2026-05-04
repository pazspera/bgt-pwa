<script setup lang="ts">
import TypographyChart from '@/components/molecules/TypographyChart.vue';
import { useDocumentTitle } from '@/composables/useDocumentTitle';

useDocumentTitle("Tipografía - BGT");

</script>


<template>
  <v-container class="my-4 my-md-6 my-lg-8">
    <TypographyChart></TypographyChart>
  </v-container>
</template>
