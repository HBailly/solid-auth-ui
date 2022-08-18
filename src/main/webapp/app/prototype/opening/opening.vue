<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Introduction</h3>

    <callout-component :text="callout()" :type="CalloutType.WARNING"></callout-component>
    <videos-component :standalone="false" />
    <about-component :standalone="false" />
    <glossary-component :standalone="false" />

    <b-button-group style="float: left; margin-top: 5px">
      <b-button class="btn btn-light" @click="previous()">Back</b-button>
      <b-button ref="next" class="btn btn-light" style="margin-left: 5px" @click="next()">Next</b-button>
    </b-button-group>
    <div style="width: 100%" />
  </div>
</template>

<script lang="ts" src="./opening.component.ts"></script>
