<script setup lang="ts">
import DisplayTitle from '../atoms/typography/DisplayTitle.vue';
import SectionTitle from '../atoms/typography/SectionTitle.vue';
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import BlockHeading from '../atoms/typography/BlockHeading.vue';

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
        <tr>
          <td>H2</td>
          <td><section-title>Section Title</section-title></td>
          <td>Section title</td>
        </tr>
        <tr>
          <td>H3</td>
          <td><subsection-title>Subsection Title</subsection-title></td>
          <td>Subsection title</td>
        </tr>
        <tr>
          <td>H4</td>
          <td><block-heading>Block Heading</block-heading></td>
          <td>Block heading</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>