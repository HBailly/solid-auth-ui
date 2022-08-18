<template>
  <tr v-if="need" class="card">
    <td class="p-0">
      <div
        :id="'need-header-' + need.id"
        class="btn btn-block"
        v-bind:class="{
          'text-white': isSelected(),
          'btn-outline-danger': isDeselected(),
          'btn-secondary': isSelected(),
          'btn-outline-success': isSelectedAndAccepted(),
        }"
      >
        <h5 v-b-toggle="'collapse-' + this.id" style="position: absolute; width: 100%" @click="togglePanel">
          {{ need._accessNeedDescriptionsByLanguage.get('en').prefLabel }}
        </h5>
        <span v-if="need.isDisabled()" :id="'required-' + need.id" style="position: relative; margin-left: 99%">
          <font-awesome-icon icon="square-xmark" size="lg" />
          <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'required-' + need.id" placement="left">
            The parent need/group is currently not selected, so this need cannot be selected.
          </b-tooltip>
        </span>

        <span v-if="need.isRequired() && !need.isDisabled()" :id="'required-' + need.id" style="position: relative; margin-left: 99%">
          <font-awesome-icon icon="lock" size="lg" />
          <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'required-' + need.id" placement="left">
            This need is required, is not configurable and thus cannot be deselected.
          </b-tooltip>
        </span>

        <div v-if="!need.isRequired() && !need.isDisabled()" :id="'selectAll-' + need.id" style="position: relative; margin-left: 99%">
          <b-form-checkbox
            :id="'selectAll-check-' + need.id"
            :checked="need.isAllOptional()"
            :disabled="isAccepted"
            :indeterminate="need.isIndeterminate()"
            size="lg"
            @change="toggleSelection"
          />
          <b-tooltip :delay="{ show: 600, hide: 50 }" :target="'selectAll-' + need.id" :title="selectTooltip()" placement="left" />
        </div>
      </div>

      <div
        :id="'need-collapse-' + need.id"
        :aria-labelledby="'need-header-' + need.id"
        class="collapse"
        data-parent="#accordion"
        v-bind:class="{ show: this.show }"
      >
        <div class="card-body">
          <p class="font-italic">
            {{ need._accessNeedDescriptionsByLanguage.get('en').description }}
          </p>

          <table class="table table-striped table-hover table-s mb-0">
            <tbody>
              <registered-shape-tree-component :context="context" :shape="need._shapeTree" />
              <access-necessity-component :context="context" :necessity="need.accessNecessity" />
              <access-modes-component
                v-if="need.accessMode"
                :context="context"
                :creator="toSafeArray(need.creatorAccessMode)"
                :existing="toSafeArray(need.accessMode)"
              />
              <purposes-component v-if="need.hasPurpose" :context="context" :purposes="toSafeArray(need.hasPurpose)" />
              <scope-of-access-component
                :ascendant="need._ascendantNeed"
                :context="context"
                :enabled="need._isSelected && !isAccepted"
                :parent="need._parentNeed"
                :scope="need._scopeOfAuthorization"
                :shapeTree="need.registeredShapeTree"
                @onScopeSelectionChange="onScopeSelectionChange"
              />
              <data-instances-component v-if="need.hasDataInstance" :context="context" :instances="toSafeArray(need.hasDataInstance)" />
              <parent-component :context="context" :parent="need._parentNeed" />
              <children-component :children="need.getChildren()" :context="context" />
              <inheritors-component :context="context" :inheritors="need.getInheritors()" />
              <inherits-from-need-component v-if="need.inheritsFromNeed" :ascendant="need._ascendantNeed" :context="context" />
            </tbody>
          </table>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" src="./accessNeed.component.ts"></script>
