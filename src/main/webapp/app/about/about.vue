<template>
  <div style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <h3 v-if="standalone" class="display-7" style="margin-bottom: 35px; width: 1200px">About</h3>
    <p v-else>Read the following cards to learn more about the context of this project.</p>
    <solid-component />
    <interop-component />
    <dpv-component />
    <projectron-component />
    <interface-component />
  </div>
</template>

<script lang="ts" src="./about.component.ts"></script>
