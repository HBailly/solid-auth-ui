<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <img
          alt="Refusal"
          class="mx-auto d-block img-fluid rounded"
          src="https://www.svgrepo.com/show/216708/forbidden.svg"
          style="max-width: 500px; max-height: 150px"
        />
      </div>
      <div class="col-md-9">
        <h1>Consent Denied!</h1>
        <div class="alert alert-danger">You have been taken here because you have chosen not to consent to this research.</div>
      </div>
    </div>
    <div class="container" style="position: relative">
      <div style="text-align: center; margin-top: 15px; margin-bottom: 15px">
        If this is an error, or you have reconsidered your position, you can always return to the experiment by clicking on the following
        button:
      </div>
      <div
        style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%)"
      />
      <b-button block class="mr-auto ml-auto" re="back" style="width: 30%" to="/prototype/" variant="info"
        >Back to the experiment
      </b-button>
    </div>
  </div>
</template>

<script lang="ts" src="./refusal.component.ts"></script>
