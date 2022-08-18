<template>
  <tr v-if="shape" class="d-flex">
    <th :id="'registeredShapeTree-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      {{ dictionary.get(dictionary.prefixes.interop + 'registeredShapeTree').label }}
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'registeredShapeTree-' + this.id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'registeredShapeTree').comment }}
      </b-tooltip>
    </th>
    <td class="col-auto">
      <span :id="'shape-' + this.id" style="color: #7c4dff; font-weight: bolder">{{ shape.prefLabel }}</span>
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'shape-' + this.id" trigers="hover">
        {{ shape.definition }}
      </b-tooltip>
    </td>
    <td class="col-auto">
      <span :id="'datatype-' + this.id" style="font-size: small">({{ dictionary.get(shape.hasData).label }})</span>
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'datatype-' + this.id" trigers="hover">
        {{ dictionary.get(shape.hasData).description }}
      </b-tooltip>
    </td>
  </tr>
</template>

<script lang="ts" src="./registeredShapeTree.component.ts"></script>
