<template>
  <div>
    <div v-if="authorizations && authorizations.length > 0">
      <div v-for="(auth, index) in authorizations" :key="index" class="card mb-3">
        <div class="card-header">Data Authorization</div>
        <div class="card-body p-3" style="white-space: pre-wrap; font-size: small">{{ auth }}</div>
      </div>
    </div>

    <div v-else class="mb-10">
      <b-spinner class="spinner" />
      Loading authorizations...
    </div>
  </div>
</template>

<script lang="ts" src="./data.component.ts"></script>
