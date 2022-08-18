<template>
  <div
      :class="{
      card: true,
      'mr-auto': true,
      'ml-auto': true,
      'border-info': type === CalloutType.INFO,
      'border-warning': type === CalloutType.WARNING,
      'border-danger': type === CalloutType.ERROR,
    }"
      style="width: fit-content; margin-bottom: 30px"
  >
    <div class="card-body p-3">
      <div class="row">
        <p class="col-auto mt-auto mb-auto" style="text-align: center">
          <font-awesome-icon v-if="type === CalloutType.INFO" class="text-info" icon="circle-info"/>
          <font-awesome-icon v-if="type === CalloutType.WARNING" class="text-warning" icon="circle-exclamation"/>
          <font-awesome-icon v-if="type === CalloutType.ERROR" class="text-danger" icon="circle-xmark"/>
        </p>
        <p
            :class="{
            'col-auto': true,
            'text-info': type === CalloutType.INFO,
            'text-warning': type === CalloutType.WARNING,
            'text-danger': type === CalloutType.ERROR,
            'mt-0': true,
            'mb-0': true,
          }"
            style="white-space: pre-wrap"
        >{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./callout.component.ts"></script>
