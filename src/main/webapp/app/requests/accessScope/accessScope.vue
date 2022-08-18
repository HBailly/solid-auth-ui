<template>
  <tr v-if="values" class="d-flex">
    <th :id="'scopeOfAccess-' + this.getId()" class="col-sm-3 col-md-3 col-lg-2" scope="col">Scope of Access</th>
    <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'scopeOfAccess-' + this.getId()" trigers="hover">
      {{ dictionary.get(dictionary.prefixes.interop + 'scopeOfAuthorization').comment }}
    </b-tooltip>
    <td class="col-auto">
      <b-form-select required v-bind:disabled="!enabled" v-bind:value="selected" @input="scope => update(scope)">
        <b-form-select-option
          v-for="[id, value] in values"
          :id="value + '-' + getId()"
          :key="id"
          :title="dictionary.get(id).comment"
          :value="id"
          default
        >
          {{ value }}
        </b-form-select-option>
      </b-form-select>
      <p v-if="isMultiSelectable()" class="small">(use CTRL+click to select multiple instances)</p>
    </td>
    <all-from-agent-component
      v-if="selected === ScopeOfAuthorizationType.AllFromAgent"
      :context="context"
      :enabled="enabled"
      :parameter="scope.parameter"
    />
    <all-from-registry-component
      v-if="selected === ScopeOfAuthorizationType.AllFromRegistry"
      :context="context"
      :enabled="enabled"
      :parameter="scope.parameter"
      :shapeTree="shapeTree"
    />
    <selected-from-registry-component
      v-if="selected === ScopeOfAuthorizationType.SelectedFromRegistry"
      :context="context"
      :enabled="enabled"
      :parameter="scope.parameter"
      :shapeTree="shapeTree"
    />
  </tr>
</template>

<script lang="ts" src="./accessScope.component.ts"></script>
