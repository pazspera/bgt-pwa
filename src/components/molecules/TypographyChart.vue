<script setup lang="ts">
import DisplayTitle from '../atoms/typography/DisplayTitle.vue';
import SectionTitle from '../atoms/typography/SectionTitle.vue';
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import BlockHeading from '../atoms/typography/BlockHeading.vue';
import CardHeading from '../atoms/typography/CardHeading.vue';
import MinorHeading from '../atoms/typography/MinorHeading.vue';
import LeadText from '../atoms/typography/LeadText.vue';

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
        <tr>
          <td>H5</td>
          <td><card-heading>Card Heading</card-heading></td>
          <td>Card heading</td>
        </tr>
        <tr>
          <td>H6</td>
          <td><minor-heading>Minor Heading</minor-heading></td>
          <td>Minor heading</td>
        </tr>
        <tr>
          <td>P</td>
          <td><lead-text>Lead Text</lead-text></td>
          <td>Subtitle 1</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>