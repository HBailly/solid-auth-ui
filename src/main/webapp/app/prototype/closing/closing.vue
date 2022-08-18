<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Survey completed!</h3>
    <div class="row">
      <b-img
        alt="Check mark"
        class="col-auto align-middle"
        height="50%"
        src="https://www.svgrepo.com/show/209707/checkmark.svg"
        style="opacity: 50%; display: block; margin-top: auto; margin-bottom: auto"
      />
      <div class="col-auto align-bottom" style="margin-top: auto">
        <h4>You have successfully completed all the steps.</h4>
      </div>
    </div>
    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
      <b-img
        alt="Check mark"
        class="col-auto align-middle"
        height="50%"
        src="https://www.svgrepo.com/show/209707/checkmark.svg"
        style="visibility: hidden; display: block; margin-top: 0; margin-bottom: 0"
      />
      <div class="col-auto" style="margin-top: 0; margin-bottom: 0">
        <h5 style="font-weight: bold">
          Your Session ID: <span style="color: #7c4dff">{{ this.context.session.id }}</span>
        </h5>
      </div>
    </div>

    <h5 style="font-weight: bolder; margin-top: 30px; margin-bottom: 50px; text-align: center">
      Thank you for taking the time to complete this survey.
      <br />
      You may now close this window.
    </h5>

    <contact-component :standalone="false" />
    <callout-component
      :text="
        'In case you might be interested, the next section will present the authorizations that have been produced as a result of your actions.\n' +
        'They will be presented in turtle file format (technical format).\n' +
        '\n' +
        'This section is not part of the experiment and is entirely optional.'
      "
      type="INFO"
    />

    <b-button-group style="float: left; margin-top: 5px">
      <b-button class="btn btn-light" @click="previous()">Back</b-button>
      <b-button ref="next" class="btn btn-light" style="margin-left: 5px" @click="next()">Next</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts" src="./closing.component.ts"></script>
