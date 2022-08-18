<template>
  <div>
    <td v-if="options" class="col-auto">
      <b-form-select
        v-model="selected"
        :options="options"
        :select-size="10"
        multiple
        required
        text-field="text"
        v-bind:disabled="!enabled"
        value-field="value"
        @input="e => update(e)"
      >
      </b-form-select>
    </td>
  </div>
</template>

<script lang="ts" src="./selectedFromRegistry.component.ts"></script>
