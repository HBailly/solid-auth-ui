<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Guidelines</h3>

    <p>You will now proceed to the user interface prototype evaluation.</p>

    <p>
      In the following sections, you will be presented with three tasks involving <em class="text-warning">different versions</em> of the
      <em class="text-warning">same access request</em> emanating from a Project Management Application named
      <em style="accent-color: #7c4dff">Projectron</em>.
    </p>
    <p>
      For each task, you will be given a set of similar permissions to select and configure before granting access to the application. You
      should carefully evaluate what each permission/access need entails, unselect those that are superfluous, and restrict the scope of
      those that are required but excessive.
    </p>

    <callout-component :text="callout()" type="INFO" />

    <p>Thank you for your time and co-operation.</p>

    <context-component />

    <b-button-group style="float: left; margin-top: 5px">
      <b-button class="btn btn-light" @click="previous()">Back</b-button>
      <b-button ref="next" class="btn btn-light" style="margin-left: 5px" @click="next()">Next</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts" src="./guidelines.component.ts"></script>
