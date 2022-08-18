<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">{{ scenario.label }}</h3>

    <context-component :shouldExpand="shouldExpand" />
    <br />
    <div id="scenario-accordion"></div>
    <div class="card">
      <button
        id="Instructions-header"
        aria-controls="Instructions-body"
        aria-expanded="true"
        class="btn btn-light card-header"
        data-target="#Instructions-body"
        data-toggle="collapse"
        type="button"
        @click="toggle('Instructions-body')"
      >
        Instructions
      </button>
      <div id="Instructions-body" aria-labelledby="Instructions-header" class="collapse show" data-parent="#scenario-accordion">
        <div class="card-body">
          <span style="white-space: pre-wrap" v-html="scenario.description"></span>
          <br />
          <ul>
            <li v-for="(task, index) in scenario.tasks" :key="index">
              <span v-html="task"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />

    <div class="card">
      <access-request-component
        :key="scenario.stage"
        :context="context"
        :scenario="scenario.name"
        class="card-body"
        @accept="accept"
        @next="next"
        @prev="previous"
        @refuse="refuse"
      />
    </div>
    <b-button-group style="float: left; margin-top: 5px">
      <b-button class="btn btn-light" @click="previous()">Back</b-button>
      <b-button ref="next" class="btn btn-light" style="margin-left: 5px" v-bind:disabled="!canGoNext()" @click="next()">Next </b-button>
      <b-button v-if="false" class="btn btn-light" style="margin-left: 5px" @click="next()">Skip</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts" src="./scenario.component.ts"></script>
