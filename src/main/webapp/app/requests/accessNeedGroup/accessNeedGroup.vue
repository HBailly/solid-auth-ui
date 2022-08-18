<template>
  <div v-if="group" class="card">
    <div
        :id="'group-header-' + group.id"
        class="btn btn-block"
        v-bind:class="{
        'btn-danger': isDeselected(),
        'btn-info': isSelected(),
        'btn-success': isSelectedAndAccepted(),
      }"
    >
      <h4 v-b-toggle="this.id" class="font-italic" style="position: absolute; width: 100%" @click="togglePanel">
        {{ group._accessNeedGroupDescriptionsByLanguage.get('en').prefLabel }}
      </h4>

      <span v-if="!this.group.isCustomizable()" :id="'required-' + group.id"
            style="position: relative; margin-left: 99%">
        <font-awesome-icon icon="lock"/>
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'required-' + group.id" trigers="hover">
          This group of needs is required, is not configurable and thus cannot be deselected.
        </b-tooltip>
      </span>

      <span v-if="this.group.isCustomizable()" :id="'selectAll-' + group.id"
            style="position: relative; margin-left: 99%">
        <b-form-checkbox
            :id="'selectAll-check-' + group.id"
            inline
            size="lg"
            v-bind:checked="group.isAllOptional()"
            v-bind:indeterminate="group.isIndeterminate()"
            @change="toggleSelection"
        >
        </b-form-checkbox>
        <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'selectAll-' + group.id" :title="selectTooltip()"
                   placement="left"/>
      </span>
    </div>

    <div
        :id="'group-collapse-' + group.id"
        :aria-labelledby="'group-header-' + group.id"
        class="collapse"
        data-parent="#accordion"
        v-bind:class="{ show: this.show }"
    >
      <div class="card-body">
        <p>
          {{ group._accessNeedGroupDescriptionsByLanguage.get('en').description }}
        </p>
        <table class="table table-striped table-hover table-sm mb-0">
          <tbody>
          <access-necessity-component :context="context" v-bind:necessity="group.accessNecessity"/>
          <access-scenario-component :context="context" v-bind:scenario="group.accessScenario"/>
          <authenticate-as-component :context="context" v-bind:profile="group.authenticatesAs"/>

          <div :id="'accordion-' + group.id">
            <access-need-component
                class="mt-2"
                v-for="need in group.getAccessNeedsAsArray()"
                :key="need.id + id"
                :accordion="'accordion-main'"
                :cascadeRefresh="cascadeRefresh"
                :collapsedStates="collapsedStates"
                :context="context"
                :isAccepted="isAccepted"
                :need="need"
                @onSelectionChange="onSelectionChange"
            />
          </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./accessNeedGroup.component.ts"></script>
