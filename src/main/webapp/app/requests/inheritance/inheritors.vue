<template>
  <tr v-if="inheritors && inheritors.length > 0" class="d-flex">
    <th :id="'inheritors-' + this.id" class="col-sm-3 col-md-3 col-lg-2" scope="col">
      Inheritor Needs
      <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'inheritors-' + this.id" trigers="hover"
        >The needs whose scope of authorization can inherit from this need's scope of authorization.
      </b-tooltip>
    </th>
    <td>
      <table class="table table-borderless table-condensed mb-0">
        <tr v-for="need in inheritors" :key="need.id" style="background: transparent">
          <td :id="'inheritor-' + need.id" class="col-auto">
            {{ need._accessNeedDescriptionsByLanguage.get('en').prefLabel }}
            <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'inheritor-' + need.id" trigers="hover">
              {{ need._accessNeedDescriptionsByLanguage.get('en').description }}
            </b-tooltip>
          </td>
          <td>
            <font-awesome-icon
              :id="'jump-2-inheritor-' + need.id"
              class="btn btn-outline-dark btn-sm"
              icon="arrow-turn-down"
              size="1x"
              style="border-radius: 50%"
              @click="scrollToDependent(need.id)"
            />
            <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'jump-2-inheritor-' + need.id" trigers="hover"
              >Jump to descendant need
            </b-tooltip>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>

<script lang="ts" src="./inheritors.ts"></script>
