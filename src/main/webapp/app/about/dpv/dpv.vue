<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded">About the <strong>Data Privacy Vocabulary</strong> (DPV)</div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <blockquote class="blockquote font-italic text-primary ml-5 mr-5 mb-0" style="font-size: medium">
          <p class="mb-2">
            The Data Privacy Vocabulary [DPV] enables expressing machine-readable metadata about the use and processing of personal data
            based on legislative requirements such as the General Data Protection Regulation [GDPR].
            <span class="blockquote-footer mt-0" style="text-align: right">
              Data Privacy Vocabulary (DPV) - <a href="https://w3c.github.io/dpv/dpv/">Draft Community Group Report 25 May 2022</a>
            </span>
          </p>
        </blockquote>
        <p>
          The <em style="color: #7c4dff">Data Privacy Vocabulary</em> is a community-based effort to formalize the terminology associated
          with the automated processing of data. It provides application developers with a set of unambiguous, hierarchic terms describing
          the use of personal data.
        </p>
        <figure>
          <img
            class="mx-auto d-block img-fluid"
            src="https://w3c.github.io/dpv/dpv/diagrams/personaldatahandling.png"
            style="max-width: 700px"
          />
          <figcaption class="mr-auto ml-auto" style="text-align: right; font-size: small; width: available; max-width: 700px">
            Data Privacy Vocabulary (DPV) - <a href="https://w3c.github.io/dpv/dpv/">Draft Community Group Report 25 May 2022</a>
          </figcaption>
        </figure>
        <p>
          This project makes use of this terminology to extend the data interoperability panel specification to encompass privacy concerns.
        </p>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./dpv.component.ts"></script>
