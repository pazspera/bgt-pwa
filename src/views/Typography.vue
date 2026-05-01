<script setup lang="ts">
import TypographyChart from '@/components/molecules/TypographyChart.vue';
import { useDocumentTitle } from '@/composables/useDocumentTitle';

useDocumentTitle("Tipografía - BGT");

</script>


<template>
  <v-container>
    <TypographyChart></TypographyChart>
  </v-container>
</template>
