<template>
  <tr v-if="parent" class="d-flex">
    <th :id="'parentNeed-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Depends from Need
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'parentNeed-' + this.id" trigers="hover"
        >Links to the superseding access need
      </b-tooltip>
    </th>
    <td :id="'parent-' + this.id" class="col-auto">
      {{ parent._accessNeedDescriptionsByLanguage.get('en').prefLabel }}
    </td>
    <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'parent-' + this.id" trigers="hover">
      {{ parent._accessNeedDescriptionsByLanguage.get('en').description }}
    </b-tooltip>
    <td>
      <font-awesome-icon
        :id="'jump-2-parent-' + this.id"
        class="btn btn-outline-dark btn-sm"
        icon="arrow-turn-up"
        size="1x"
        style="border-radius: 50%"
        @click="scrollToParent"
      />
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'jump-2-parent-' + this.id" trigers="hover">Jump to superseding need </b-tooltip>
    </td>
  </tr>
</template>

<script lang="ts" src="./parent.component.ts"></script>
