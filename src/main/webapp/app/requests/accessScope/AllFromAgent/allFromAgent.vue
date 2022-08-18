<template>
  <td class="col-auto">
    <b-form-select
      v-model="selected"
      :options="options"
      :select-size="10"
      multiple
      required
      text-field="text"
      v-bind:disabled="!enabled"
      value-field="value"
      @input="e => updateAgent(e)"
    >
    </b-form-select>
  </td>
</template>

<script lang="ts" src="./allFromAgent.component.ts"></script>
