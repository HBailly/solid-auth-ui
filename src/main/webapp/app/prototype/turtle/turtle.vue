<template>
  <div>
    <div v-if="ready">
      <h3 ref="title" class="display-7" style="margin-bottom: 35px">Authorizations</h3>
      <table v-for="scenario in scenarios" :key="scenario" class="table table-sm">
        <tr>
          <th scope="col">Scenario {{ scenario }}</th>
        </tr>
        <tr>
          <access-component
            :authorization="accessAuths[scenario - 1]"
            :context="context"
            :dataAuthorizations="dataAuths[scenario - 1]"
            :ready="isReady[scenario - 1]"
          />
        </tr>
      </table>
      <b-button-group style="float: left; margin-top: 5px">
        <b-button class="btn btn-light" @click="previous()">Back</b-button>
        <b-button ref="next" class="btn btn-light" disabled style="margin-left: 5px" @click="next()"> Next</b-button>
      </b-button-group>
    </div>

    <div v-else class="mb-10">
      <b-spinner class="spinner" />
      Loading authorizations...
    </div>
  </div>
</template>

<script lang="ts" src="./turtle.component.ts"></script>
