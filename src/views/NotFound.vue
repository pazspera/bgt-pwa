<script setup lang="ts">
import DisplayTitle from '@/components/atoms/typography/DisplayTitle.vue';
import LeadText from '@/components/atoms/typography/LeadText.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import { useDocumentTitle } from '@/composables/useDocumentTitle';
import { NOT_FOUND } from '@/constants/ui_text/NotFound';
import { DOCUMENT_TITLES } from '@/constants/documentTitles';

defineOptions({ name: "NotFound" });

useDocumentTitle(DOCUMENT_TITLES.NOT_FOUND);

</script>

<template>
  <v-container class="my-4 my-md-6 my-lg-8">
    <v-row>
      <v-col>
        <DisplayTitle>{{ NOT_FOUND.TITLE }}</DisplayTitle>
        <div class="mb-6">
          <LeadText>{{ NOT_FOUND.TEXT_1 }}</LeadText>
          <LeadText>{{ NOT_FOUND.TEXT_2 }}</LeadText>
        </div>
        <AppButton
          size="large"
          :to="{ name: 'BoardGames' }"
          :label="NOT_FOUND.BTN_TEXT"
        />
      </v-col>
    </v-row>
  </v-container>
</template>