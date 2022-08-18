<template>
  <div>
    <div v-if="authorization">
      <div class="card mb-3">
        <div class="card-header" style="white-space: pre-wrap">Access Authorization</div>
        <div class="card-body p-3" style="white-space: pre-wrap; font-size: small">{{ authorization }}</div>
      </div>
      <data-component :authorizations="dataAuthorizations" :context="context" />
    </div>
    <div v-else class="mb-10">
      <b-spinner class="spinner" />
      Loading authorizations...
    </div>
  </div>
</template>

<script lang="ts" src="./access.component.ts"></script>
