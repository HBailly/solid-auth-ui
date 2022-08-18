<template>
  <div style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <h1 class="display-4" style="margin-bottom: 35px">Solid Application Access Request and the DPV</h1>
    <div class="home row">
      <div class="col-auto">
        <span class="police img-fluid rounded" style="max-width: 500px; max-height: 150px"/>
      </div>
      <div class="col">
        <h2>Research Question</h2>
        <p class="lead font-italic">
          To what extent can an application access request user interface using the Data Privacy Vocabulary under the
          premises of the SOLID
          authorization agent effectively enable users to provide informed consent to applications accessing
          decentralized data pods?
        </p>
      </div>
    </div>
    <div>
      <h2>Proposal</h2>
      <p>
        As of current, users can only assign discretionary, technical permissions to files: either directly or through
        inheritance. A more
        comprehensive process (authorization agent) was envisioned by the data interoperability panel, but is not
        subject to an
        implementation this far. Also, GDPR consent collection is currently not included in it.
      </p>
      <p>
        Our proposal is an implementation of the authorization that 1) covers the technical permissions and
        authorization flow described by
        the data interoperability panel, 2) encompasses GDPR informed consent collection and usage notice, and 3)
        maintain a good level of
        understandability and usability in the presentation of such information. The core of our proposal relies on the
        acceptance of the
        new process (authorization agent) by the users.
      </p>
      <p>
        If users fail to understand (or dislike) the implementation, then they are more likely to try and find
        strategies to evade the
        authorization process.
      </p>
    </div>
    <div>
      <h2>Survey</h2>
      <p>
        A survey was conducted to evaluate our prototype.
        <br/>
        It consists of the following:
      </p>
      <ol style="list-style-type: square">
        <li class="font-italic">
          a questionnaire with closed questions regarding some of your user characteristics, your experience with SOLID,
          GDPR consent and
          privacy preferences, technology and app permissions, and your privacy disposition.
        </li>
        <li class="font-italic">three directed tasks with pre-determined scenarios, using the user interface
          prototype.
        </li>
        <li class="font-italic">
          a questionnaire with open and closed questions about the tasks realized, your satisfaction with the interface
          and its performance.
        </li>
      </ol>
      <callout-component text="A session usually lasts for 45 minutes" type="INFO"/>
      <p>
        Participation is free and unsupervised.
      </p>
      <callout-component text="We are not longer collecting results." type="ERROR"/>
      <p>Thank you for your interest!</p>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
