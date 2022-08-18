<template>
  <div v-if="context" class="container-fluid" style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <div class="mt-2 mb-4">
      <b-progress v-if="stage < ExperimentStage.DONE" :max="ExperimentStage.DONE" :value="stage" animated label="Progress" />
      <b-progress v-else :max="ExperimentStage.DONE" :value="stage" label="Progress" variant="success" />
    </div>

    <plain-language-statement-component v-if="stage === ExperimentStage.PLS" :context="context" @next="next" />

    <informed-consent-component v-if="stage === ExperimentStage.CONSENT" :context="context" @next="next" @prev="previous" />

    <preliminary-component v-if="stage === ExperimentStage.PRELIMINARY" :context="context" @next="next" @prev="previous" />

    <opening-component v-else-if="stage === ExperimentStage.INTRODUCTION" :context="context" :stage="stage" @next="next" @prev="previous" />

    <guidelines-component v-else-if="stage === ExperimentStage.GUIDELINES" @next="next" @prev="previous" />

    <scenario-component
      v-else-if="[ExperimentStage.SCENARIO1, ExperimentStage.SCENARIO2, ExperimentStage.SCENARIO3].includes(stage)"
      :key="stage"
      :context="context"
      :stage="stage"
      @next="next"
      @prev="previous"
      @accept="next"
    />

    <concluding-component v-else-if="this.stage === ExperimentStage.SATISFACTION" :context="context" @next="next" @prev="previous" />
    <closing-component v-else-if="this.stage === ExperimentStage.DONE" :context="context" @next="next" @prev="previous" />
    <turtle-component v-else-if="this.stage === ExperimentStage.TURTLE" :context="context" @next="next" @prev="previous" />
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
