<template>
  <b-card class="mb-3 pb-0">
    <h4 class="mb-0">General Feedback</h4>
    <div class="card text-info m-3">
      <div class="card-body">
        <font-awesome-icon icon="circle-info" />
        Considering the last scenario (<em>Inherited Project Management</em>) only.
      </div>
    </div>
    <array-question-component :array="array" :context="context" />
  </b-card>
</template>

<script lang="ts" src="./feedback.component.ts"></script>
