<script setup lang="ts">
defineOptions({ name: "LoadingRow" });  
</script>

<template>
  <v-row>
      <v-col class="loading-col">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
</template>

<style scoped>
.loading-col {
  display: flex;
  justify-content: center;
}
</style>