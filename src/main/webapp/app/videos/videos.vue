<template>
  <div style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <h3 v-if="standalone" class="display-7" style="margin-bottom: 35px">Videos</h3>
    <demo-component :standalone="standalone" />
    <br />
    <tutorials-component :standalone="standalone" />
  </div>
</template>

<script lang="ts" src="./videos.component.ts"></script>
