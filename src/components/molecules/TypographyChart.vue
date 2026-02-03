<script setup lang="ts">
import DisplayTitle from '../atoms/typography/DisplayTitle.vue';
import SectionTitle from '../atoms/typography/SectionTitle.vue';
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import BlockHeading from '../atoms/typography/BlockHeading.vue';
import CardHeading from '../atoms/typography/CardHeading.vue';
import MinorHeading from '../atoms/typography/MinorHeading.vue';
import LeadText from '../atoms/typography/LeadText.vue';
import SupportText from '../atoms/typography/SupportText.vue';
import BodyText from '../atoms/typography/BodyText.vue';
import DetailText from '../atoms/typography/DetailText.vue';
import CaptionText from '../atoms/typography/CaptionText.vue';
import ButtonLabel from '../atoms/typography/ButtonLabel.vue';
import NavigationLink from '../atoms/typography/NavigationLink.vue';
import ExternalLink from '../atoms/typography/ExternalLink.vue';

</script>

<template>
  <v-container class="mt-8 mb-16">
    <v-table>
      <thead>
        <tr>
          <th>HTML Tag</th>
          <th>Componente</th>
          <th>Descripción</th>
          <th>Componentes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>H1</td>
          <td><display-title>Display Title</display-title></td>
          <td>Page title</td>
          <td>Vistas de la app</td>
        </tr>
        <tr>
          <td>H2</td>
          <td><section-title>Section Title</section-title></td>
          <td>Section title</td>
          <td></td>
        </tr>
        <tr>
          <td>H3</td>
          <td><subsection-title>Subsection Title</subsection-title></td>
          <td>Subsection title</td>
          <td></td>
        </tr>
        <tr>
          <td>H4</td>
          <td><block-heading>Block Heading</block-heading></td>
          <td>Block heading</td>
          <td></td>
        </tr>
        <tr>
          <td>H5</td>
          <td><card-heading>Card Heading</card-heading></td>
          <td>Card heading</td>
          <td></td>
        </tr>
        <tr>
          <td>H6</td>
          <td><minor-heading>Minor Heading</minor-heading></td>
          <td>Minor heading</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><lead-text>Lead Text</lead-text></td>
          <td>Subtitle 1</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><support-text>Support Text</support-text></td>
          <td>Subtitle 2</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><body-text>Body Text</body-text></td>
          <td>Body text</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><detail-text>Detail Text</detail-text></td>
          <td>Detail text</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><caption-text>Caption Text</caption-text></td>
          <td>Caption text</td>
          <td></td>
        </tr>
        <tr>
          <td>Span</td>
          <td><button-label>Button Label</button-label></td>
          <td>Button label</td>
          <td></td>
        </tr>
        <tr>
          <td>Router Link</td>
          <td><navigation-link :to="{ name: 'BoardGames' }">Navigation Link</navigation-link></td>
          <td>Navigation Link</td>
          <td></td>
        </tr>
        <tr>
          <td>A</td>
          <td><external-link :href="'#'" :target="'_blank'">External Link</external-link></td>
          <td>External link</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>