<template>
  <tr v-if="modes" class="d-flex row p-0 m-0" style="background: transparent">
    <td :id="'modes-' + this.id" class="font-weight-bold pt-0 pb-0">
      {{ getHeader() + ': ' }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'modes-' + this.id" :title="getTooltipTitle()" />
    </td>
    <td v-for="mode in modes" :key="mode" class="col-auto pt-0 pb-0">
      <span :id="mode + '-' + getId()">
        <font-awesome-icon :icon="icons[mode]" class="p-0" size="sm" />
        {{ dictionary.get(mode).label }}
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="mode + '-' + getId()">
          {{ dictionary.get(mode).comment }}
        </b-tooltip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts" src="./modes.ts"></script>
