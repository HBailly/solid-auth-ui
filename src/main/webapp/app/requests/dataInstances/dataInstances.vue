<template>
  <tr v-if="instances" class="d-flex">
    <th :id="'instances-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Data Instances
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'instances-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'hasDataInstance').comment }}
      </b-tooltip>
    </th>
    <td v-for="instance in Array.isArray(instances) ? instances : Array.from(instances)" :key="instance" class="col-auto">
      <p :id="instance + '-' + getId()">
        {{ instance }}
      </p>
    </td>
  </tr>
</template>

<script lang="ts" src="./dataInstances.component.ts"></script>
