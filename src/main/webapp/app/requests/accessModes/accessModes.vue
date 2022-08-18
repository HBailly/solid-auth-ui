<template>
  <tr v-if="existing" class="d-flex">
    <th :id="'modes-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Access Modes
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'modes-' + this.id">Access modes to existing and future data </b-tooltip>
    </th>
    <td>
      <table class="table table-sm table-borderless m-0" style="background: transparent">
        <modes-component :context="context" :header="HeaderType.EXISTING" :modes="existing" />
        <modes-component v-if="creator && creator.length > 0" :context="context" :header="HeaderType.CREATOR" :modes="creator" />
      </table>
    </td>
  </tr>
</template>

<script lang="ts" src="./accessModes.component.ts"></script>
