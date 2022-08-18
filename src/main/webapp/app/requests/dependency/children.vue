<template>
  <tr v-if="children && children.length > 0" class="d-flex">
    <th :id="'children-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Dependent Needs
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'children-' + this.id" trigers="hover"
        >The access needs which are requested only if this need is selected.
      </b-tooltip>
    </th>
    <td>
      <table class="table table-borderless table-condensed mb-0">
        <tr v-for="need in children" :key="'dependent-' + need.id" style="background: transparent">
          <td :id="'dependent-' + need.id" class="col-auto">
            {{ need._accessNeedDescriptionsByLanguage.get('en').prefLabel }}
            <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'dependent-' + need.id" trigers="hover">
              {{ need._accessNeedDescriptionsByLanguage.get('en').description }}
            </b-tooltip>
          </td>
          <td>
            <font-awesome-icon
              :id="'jump-2-children-' + need.id"
              class="btn btn-outline-dark btn-sm"
              icon="arrow-turn-down"
              size="1x"
              style="border-radius: 50%"
              @click="scrollToDependent(need.id)"
            />
            <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'jump-2-children-' + need.id" trigers="hover"
              >Jump to dependent need
            </b-tooltip>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>

<script lang="ts" src="./children.component.ts"></script>
