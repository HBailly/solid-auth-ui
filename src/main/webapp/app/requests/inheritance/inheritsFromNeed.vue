<template>
  <tr v-if="ascendant" class="d-flex">
    <th :id="'inheritsFromNeed-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      {{ dictionary.get(dictionary.prefixes.interop + 'inheritsFromNeed').label }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'inheritsFromNeed-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'inheritsFromNeed').comment }}
      </b-tooltip>
    </th>
    <td :id="'ascendant-' + this.id" class="col-auto">
      {{ ascendant._accessNeedDescriptionsByLanguage.get('en').prefLabel }}
    </td>
    <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'ascendant-' + this.id" trigers="hover">
      {{ ascendant._accessNeedDescriptionsByLanguage.get('en').description }}
    </b-tooltip>
    <td>
      <font-awesome-icon
        :id="'jump-2-ascendant-' + this.id"
        class="btn btn-outline-dark btn-sm"
        icon="arrow-turn-up"
        size="1x"
        style="border-radius: 50%"
        @click="scrollToAscendant"
      />
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'jump-2-ascendant-' + this.id" trigers="hover"
        >Jump to ascendant need
      </b-tooltip>
    </td>
  </tr>
</template>

<script lang="ts" src="./inheritsFromNeed.component.ts"></script>
