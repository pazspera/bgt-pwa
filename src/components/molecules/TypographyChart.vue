<script setup lang="ts">
import DisplayTitle from '../atoms/typography/DisplayTitle.vue';

</script>

<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>HTML Tag</th>
          <th>Componente</th>
          <th>Uso</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>H1</td>
          <td><display-title>Display Title</display-title></td>
          <td>Page title</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>