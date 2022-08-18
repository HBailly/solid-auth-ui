<template>
  <b-carousel-slide :caption-html="'<em class=\'text-info\'>' + caption + '</em>'" class="text-info">
    <template #img>
      <div style="display: flex; align-items: center; justify-content: center">
        <iframe
          :src="url + '?enablejsapi=1'"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          height="472.5"
          style="border: 0; align-content: center"
          title="YouTube video player"
          width="840"
        />
      </div>
    </template>
  </b-carousel-slide>
</template>

<script lang="ts" src="./resource.component.ts"></script>
