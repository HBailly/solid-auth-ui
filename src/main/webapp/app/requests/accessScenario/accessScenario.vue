<template>
  <tr v-if="scenario" class="d-flex">
    <th :id="'scenario-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      {{ dictionary.get(dictionary.prefixes.interop + 'accessScenario').label }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'scenario-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'accessScenario').comment }}
      </b-tooltip>
    </th>
    <td class="col-auto">
      <span :id="scenario + '-' + this.id">
        <font-awesome-icon :icon="icons[scenario]" size="lg" />
        {{ dictionary.get(scenario).label }}
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="scenario + '-' + this.id" trigers="hover">
          {{ dictionary.get(scenario).comment }}
        </b-tooltip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts" src="./accessScenario.component.ts"></script>
