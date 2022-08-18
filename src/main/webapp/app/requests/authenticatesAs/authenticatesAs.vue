<template>
  <tr class="d-flex">
    <th :id="'authenticatesAs' + id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Authenticates as
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'authenticatesAs' + id" trigers="hover">
        {{ dictionary.get(dictionary.prefixes.interop + 'authenticatesAs').comment }}
      </b-tooltip>
    </th>
    <td class="col-auto">
      <span :id="profile + '-' + id">
        <font-awesome-icon :icon="icons[profile]" size="sm" />
        {{ dictionary.get(profile).label }}
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="profile + '-' + id" trigers="hover">
          {{ dictionary.get(profile).comment }}
        </b-tooltip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts" src="./authenticatesAs.component.ts"></script>
