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
          <td><DisplayTitle>Display Title</DisplayTitle></td>
          <td>Page title</td>
          <td>Vistas de la app</td>
        </tr>
        <tr>
          <td>H2</td>
          <td><SectionTitle>Section Title</SectionTitle></td>
          <td>Section title</td>
          <td></td>
        </tr>
        <tr>
          <td>H3</td>
          <td><SubsectionTitle>Subsection Title</SubsectionTitle></td>
          <td>Subsection title</td>
          <td></td>
        </tr>
        <tr>
          <td>H4</td>
          <td><BlockHeading>Block Heading</BlockHeading></td>
          <td>Block heading</td>
          <td>AddGameDialog</td>
        </tr>
        <tr>
          <td>H5</td>
          <td><CardHeading>Card Heading</CardHeading></td>
          <td>Card heading</td>
          <td>BoardgameCard</td>
        </tr>
        <tr>
          <td>H6</td>
          <td><MinorHeading>Minor Heading</MinorHeading></td>
          <td>Minor heading</td>
          <td>PlayerCard</td>
        </tr>
        <tr>
          <td>P</td>
          <td><LeadText>Lead Text</LeadText></td>
          <td>Subtitle 1</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><SupportText>Support Text</SupportText></td>
          <td>Subtitle 2</td>
          <td></td>
        </tr>
        <tr>
          <td>P</td>
          <td><BodyText>Body Text</BodyText></td>
          <td>Body text</td>
          <td></td>
        </tr>
        <tr>
          <td>Span</td>
          <td><DetailText>Detail Text</DetailText></td>
          <td>Detail text</td>
          <td>AppSnackbar, AddGameDialog</td>
        </tr>
        <tr>
          <td>P</td>
          <td><CaptionText>Caption Text</CaptionText></td>
          <td>Caption text</td>
          <td></td>
        </tr>
        <tr>
          <td>Span</td>
          <td><ButtonLabel>Button Label</ButtonLabel></td>
          <td>Button label</td>
          <td>AppButton, AppSnackbar</td>
        </tr>
        <tr>
          <td>Span</td>
          <td><BottomNavLabel>Bottom Nav Label</BottomNavLabel></td>
          <td>Bottom nav label</td>
          <td>BottomNavButton</td>
        </tr>
        <tr>
          <td>Router Link</td>
          <td><NavigationLink :to="{ name: 'BoardGames' }">Navigation Link</NavigationLink></td>
          <td>Navigation Link</td>
          <td></td>
        </tr>
        <tr>
          <td>A</td>
          <td><ExternalLink :href="'#'" :target="'_blank'">External Link</ExternalLink></td>
          <td>External link</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>