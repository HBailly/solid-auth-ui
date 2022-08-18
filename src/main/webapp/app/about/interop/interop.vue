<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded">About the <strong>SOLID Data Interoperability Panel Specification</strong></div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <p>
          The <em style="color: #7c4dff">SOLID Data Interoperability Panel</em> is a working group dedicated to the vision of re-utilization
          of data by distinct service providers.
        </p>

        <blockquote class="blockquote font-italic text-primary ml-5 mr-5 mb-0" style="font-size: medium">
          <p class="mb-2">
            [SOLID] must be able to support data interoperability across applications while enabling secure collaboration and query using
            intuitive data boundaries.
          </p>
          <p class="mb-2">
            Diversity in how the same data will be accessed and manipulated by different entities and applications exacerbates the need for
            reliable mechanisms that protect against data corruption, data leakage, or broken workflows.
          </p>
          <p class="mb-2">
            Standard methods and mechanisms for interoperability, collaboration, and security of data in a SOLID Pod must realize these
            needs, and it must be done without changing the fundamentals of SOLID.
          </p>
        </blockquote>

        <p class="blockquote-footer mt-0 ml-5 mr-5" style="text-align: right">
          <a href="https://github.com/solid/data-interoperability-panel">SOLID Data Interoperability Panel</a>
        </p>

        <p class="text-info">
          <font-awesome-icon icon="circle-info" />
          As stated, one of the key features is to <em>organize data sharing</em> whilst <em>preserving the security of data</em>.
        </p>
        <p>
          In 2021, the data interoperability panel presented its
          <em
            ><a href="https://solid.github.io/data-interoperability-panel/specification/" style="font-weight: normal"
              >Solid Application Interoperability</a
            ></em
          >
          proposal: a specification to enable application to access structured data in pods.
          <br />
          A key feature of the proposal is the
          <em style="color: #7c4dff">authorization flow</em>, a mechanism allowing the user to express his/her privacy and security
          preferences regarding an application accessing their pod.
        </p>

        <figure>
          <img
            alt="Schema of SOLID application access workflow"
            class="mx-auto d-block img-fluid"
            src="@/../content/images/Access-Solution.png"
            style="max-width: 700px"
          />
          <figcaption class="mr-auto ml-auto" style="text-align: right; font-size: small; width: available; max-width: 700px">
            Icon credits: <a href="https://www.flaticon.com/authors/juicy-fish">juicy_fish on Flaticon</a>
            <br />
            <a href="https://creativecommons.org/licenses/by/4.0/"
              ><img
                alt="Creative Commons Attribution 4.0"
                src="https://rubenverborgh.github.io/WebFundamentals/_shared/images/cc-by-small.svg"
            /></a>
          </figcaption>
        </figure>
        <ol>
          <li>
            A user chooses to use a new application developed by a service provider, using an app launcher/store similar to that of
            Android/Apple.
          </li>
          <li>Before accessing the user's data in his/her POD, the new application must be explicitly authorized by the user.</li>
          <li>
            In order to be authorized, the application defines a set of access requirements, called <em>access needs</em>, then addresses an
            <span style="font-weight: bold">access request</span> to the user.
          </li>
          <li>
            The user reviews the access needs, decides whether he/she consents to the use of his/her data (<em>access authorization</em>),
            and optionally provides a restricted scope to the access authorization (<em>data authorization</em>).
          </li>
          <li>
            Whenever an authorized application tries to access any data in the POD, its request is compared to its authorization and
            granted/denied accordingly.
          </li>
        </ol>
        <p>
          This project is a first attempt at implementing this specification.
          <br />
          In addition, it will extend this specification by including the Data Privacy Vocabulary to include privacy-aware terminology.
        </p>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./interop.component.ts"></script>
