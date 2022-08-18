<template>
  <td class="col-auto">
    <b-form-select
      v-model="selected"
      :options="options"
      :select-size="10"
      multiple
      required
      text-field="key"
      v-bind:disabled="!enabled"
      value-field="value"
      @input="e => updateRegistry(e)"
    >
    </b-form-select>
  </td>
</template>

<script lang="ts" src="./allFromRegistry.component.ts"></script>
