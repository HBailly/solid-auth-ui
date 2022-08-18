<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Informed Consent Form</h3>
    <div class="card mb-2 mr-auto ml-auto" style="width: 90%">
      <div class="card-body p-4 text-primary font-italic">
        Dublin City University endeavours to ensure that all research carried out by DCU researchers is ethically sound and adheres to the
        highest standards of research integrity.
        <br />
        All research projects are conducted in accordance with the law, and also according to acceptable ethical standards.
      </div>
    </div>
    <p>Before proceeding, please take time to review and answer the following questions carefully.</p>

    <callout-component text="You must consent entirely to this research in order to proceed." type="INFO" />

    <p>Feel free to ask the investigators if there is anything that is not clear or if you would like more information.</p>

    <b-form @submit="submit">
      <array-question-component :array="array" :context="context" />

      <b-button-group style="float: left; margin-top: 5px">
        <b-button class="btn btn-light" @click="previous()">Back</b-button>
        <b-button ref="next" class="btn btn-light" style="margin-left: 5px" v-bind:disabled="!approved" @click="next()"> Next </b-button>
        <b-button v-if="false" class="btn btn-light" style="margin-left: 5px" @click="next()">Skip</b-button>
      </b-button-group>
      <div style="width: 100%" />
      <b-button-group style="float: right; margin-top: 5px">
        <b-button class="btn btn-danger" style="margin-right: 5px" @click="refuse">Refuse</b-button>
        <b-button class="btn btn-success" style="margin-left: 5px" type="submit">Accept</b-button>
      </b-button-group>
    </b-form>
  </div>
</template>

<script lang="ts" src="./consent.component.ts"></script>
