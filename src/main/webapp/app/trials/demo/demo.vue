<template>
  <div v-if="context" class="container-fluid" style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <access-request-component
      :key="key"
      :application="context.application"
      :context="context"
      :scenario="ScenarioName.super_extended"
      @accept="accept"
      @next="next"
      @prev="previous"
      @refuse="refuse"
    />
    <b-button style="margin-top: 5px; margin-left: 15px" @click="reset()">Reset</b-button>
  </div>
</template>

<script lang="ts" src="./demo.component.ts"></script>
