<template>
  <div style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <h3 v-if="standalone" class="display-7" style="margin-bottom: 35px; width: 1200px">Glossary</h3>
    <p v-else>Read the following card to read more about the terms used in this prototype.</p>
    <div class="card mb-3">
      <div class="card-header" @click="expanded = !expanded"><strong>Glossary</strong></div>
      <b-collapse v-model="expanded">
        <div class="card-body p-3">
          <table class="table table-sm table-responsive" style="table-layout: fixed; width: 100%">
            <tr>
              <th scope="col">Term</th>
              <th scope="col" style="width: 100%; white-space: nowrap">Definition</th>
            </tr>
            <tr v-for="entry in entries" :key="entry.term">
              <th class="pr-3" scope="row" style="white-space: nowrap"><span v-html="entry.term" /></th>
              <td class="font-italic" style="white-space: pre-wrap"><span v-html="entry.definition" /></td>
            </tr>
          </table>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts" src="./glossary.component.ts"></script>
