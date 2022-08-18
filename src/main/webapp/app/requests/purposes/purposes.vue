<template>
  <tr v-if="purposes" class="d-flex">
    <th :id="'purposes-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      {{ dictionary.get(dictionary.prefixes.interop + 'hasPurpose').label }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'purposes-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'hasPurpose').comment }}
      </b-tooltip>
    </th>
    <td>
      <span v-for="purpose in purposes" :id="purpose + '-' + getId()" :key="purpose" class="col-auto" style="padding-left: 0">
        {{ dictionary.get(purpose).label }}
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="purpose + '-' + getId()" trigers="hover">
          {{ dictionary.get(purpose).description ? dictionary.get(purpose).description : 'No description available' }}
        </b-tooltip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts" src="./purposes.component.ts"></script>
