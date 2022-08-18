<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded">About <strong>SOLID</strong></div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <p class="font-italic text-primary" style="width: fit-content; text-align: center; margin-left: auto; margin-right: auto">
          Users should have the freedom to choose where their data resides and who is allowed to access it.
          <span class="blockquote-footer" style="text-align: right"><a href="https://solid.mit.edu">solid.mit.edu</a></span>
        </p>
        <div class="row">
          <div class="col-6">
            <p>
              <em style="color: #7c4dff">SOLID</em> (derived from "<strong>So</strong>cial <strong>Li</strong>nked <strong>D</strong>ata")
              is a proposed set of conventions and tools for building decentralized social applications based on Linked Data principles.
            </p>
            <p>
              Current Web Applications typically are based on a web site. Users typically have an identity on the site, and the site manages
              access to information about them and about others with some flexibility, typically based on different types of information,
              and different groups of people.
            </p>
            <p class="text-danger">
              <font-awesome-icon icon="circle-exclamation" />
              A well-documented frustration is the fact that each site stores the user's data in a silo.
            </p>
            <ul>
              <li>The user's data is duplicated across the silos (service providers).</li>
              <li>The user is not in control of his or her data.</li>
            </ul>
            <p class="text-info">
              <font-awesome-icon icon="circle-info" />
              Solid intends to reverse this trend by <em>re-decentralizing</em> the Web.
            </p>
            <ul>
              <li>Each user would own one, or more, personal online data stores (PODs), to store their data once.</li>
              <li>Each service provider would request access and use unique data from the POD.</li>
              <li>Different providers could access the same data (e.g. pictures, or contact details).</li>
            </ul>
            <p>
              <font-awesome-icon icon="warning" />
              Returning the control to the user entails the transfer of responsibility for managing resources inside the PODs.
              <br />
              This project explores the effectiveness of Data Interoperability Specification for granting/denying access to service
              providers.
            </p>
          </div>
          <div class="col-6" style="display: flex; justify-content: center; align-items: center">
            <figure style="text-align: center">
              <img
                alt="Data Pods"
                class="mx-auto d-block img-fluid"
                src="https://rubenverborgh.github.io/WebFundamentals/decentralization/images/data-pods.svg"
                style="max-width: 550px"
              />

              <figcaption class="mr-auto ml-auto" style="width: available; max-width: 550px">
                <em> Decentralized data silos vs Solid personal datastores.</em>
                <p class="blockquote-footer" style="text-align: right; font-size: small">
                  <a href="https://rubenverborgh.github.io/WebFundamentals/decentralization/#data-pods">Re-decentralizing the Web</a>
                  by <a href="https://ruben.verborgh.org">Ruben Verborgh</a>
                  <br />
                  <a href="https://creativecommons.org/licenses/by/4.0/"
                    ><img
                      alt="Creative Commons Attribution 4.0"
                      src="https://rubenverborgh.github.io/WebFundamentals/_shared/images/cc-by-small.svg"
                  /></a>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./solid.component.ts"></script>
