<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Review</h3>

    <b-form @submit="submit">
      <feedback-component :context="context" :questionnaire="questionnaire" />

      <b-button-group style="float: left; margin-top: 5px">
        <b-button class="btn btn-light" @click="previous()">Back</b-button>
        <b-button ref="next" class="btn btn-light" style="margin-left: 5px" type="submit">Next</b-button>
        <b-button v-if="false" class="btn btn-light" style="margin-left: 5px" @click="next()">Skip</b-button>
        /b-button>
      </b-button-group>
      <div style="width: 100%" />
    </b-form>
  </div>
</template>

<script lang="ts" src="./review.component.ts"></script>
