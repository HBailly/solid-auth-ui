<template>
  <tr v-if="this.necessity" class="d-flex">
    <th :id="'accessNecessity-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      {{ dictionary.get(dictionary.prefixes.interop + 'accessNecessity').label }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'accessNecessity-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'accessNecessity').comment }}
      </b-tooltip>
    </th>
    <td class="col-auto">
      <span :id="this.necessity + '-' + this.id">
        <font-awesome-icon :icon="icons[this.necessity]" size="sm" />
        {{ dictionary.get(this.necessity).label }}
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="this.necessity + '-' + this.id" trigers="hover">
          {{ dictionary.get(this.necessity).comment }}
        </b-tooltip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts" src="./accessNecessity.component.ts"></script>
