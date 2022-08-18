<template>
  <b-form v-if="application" class="container-fluid" @submit="grantAuthorization">
    <div class="home row" style="margin-left: 15px">
      <div class="col-2" style="display: block; overflow: hidden; position: relative; text-align: center">
        <img
          :src="application.applicationThumbnail"
          alt="Application thumbnail"
          style="bottom: 0; left: 0; margin: auto; max-height: 100%; max-width: 100%; position: absolute; right: 0; top: 0"
        />
      </div>
      <div class="col-10">
        <div class="table table-sm table-responsive table-borderless" style="table-layout: fixed; width: 100%; max-width: 100%">
          <tr>
            <td style="width: 100%">
              <h2>
                <em class="font-weight-bold">
                  {{ application.applicationName }}
                </em>
                wants to connect!
              </h2>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <p>{{ application.applicationDescription }}</p>
            </td>
            <td>
              <router-link target="_blank" to="/prototype/tutorial">
                <font-awesome-icon id="tutorials" icon="chalkboard-user" />
                <b-tooltip :delay="{ show: 600, hide: 50 }" placement="left" target="tutorials"
                  >Click to open Tutorials in new window
                </b-tooltip>
              </router-link>
              <br />
              <router-link target="_blank" to="/prototype/glossary">
                <font-awesome-icon id="glossary" icon="spell-check" />
                <b-tooltip :delay="{ show: 600, hide: 50 }" placement="left" target="glossary"
                  >Click to open Glossary in new window
                </b-tooltip>
              </router-link>
            </td>
          </tr>
          <tr>
            <td>
              Author: <em>{{ application._author.name }}</em> ({{ application.applicationAuthor }})
            </td>
            <td id="checkSelectAll" class="align-middle">
              <b-form-checkbox
                :disabled="disabled"
                size="lg"
                v-bind:checked="isAllOptional"
                v-bind:indeterminate="isIndeterminate"
                @change="toggleRequired"
              />
              <b-tooltip :delay="{ show: 600, hide: 50 }" :title="selectTooltip()" placement="left" target="checkSelectAll" />
            </td>
          </tr>
        </div>
      </div>
    </div>
    <br />

    <div id="accordion">
      <access-need-group-component
        v-for="[id, group] in application._accessNeedGroups"
        :key="'collapse-' + id + cascadeRefresh"
        :cascadeRefresh="cascadeRefresh"
        :collapsedStates="collapsedStates"
        :context="context"
        :group="group"
        :isAccepted="disabled"
        @onGroupSelectionChange="onGroupSelectionChange"
      />
    </div>
    <div>
      <div style="width: 100%" />
      <b-button-group style="float: right; margin-top: 5px">
        <b-button class="btn btn-danger" style="margin-right: 5px" v-bind:disabled="disabled" @click="denyAuthorization">Refuse </b-button>
        <b-button class="btn btn-success" style="margin-left: 5px" type="submit" v-bind:disabled="disabled">Accept </b-button>
      </b-button-group>
    </div>
  </b-form>
</template>

<script lang="ts" src="./accessRequest.component.ts"></script>
