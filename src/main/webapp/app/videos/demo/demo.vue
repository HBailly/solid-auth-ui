<template>
  <div>
    <h4 class="display-8">Demo</h4>
    <p v-if="!standalone">
      Watch the following video to see how to select and customize an access request before granting/denying access to an application.
    </p>
    <div style="display: flex; align-items: center; justify-content: center">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        height="630"
        src="https://www.youtube-nocookie.com/embed/0-2RMgGiGu0"
        style="border: 0; align-content: center"
        title="YouTube video player"
        width="1120"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./demo.component.ts"></script>
