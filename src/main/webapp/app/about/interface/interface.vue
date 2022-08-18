<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded">About <strong>this interface prototype</strong></div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <p>
          This <em style="color: #7c4dff">project</em> is a M.Sc in Computing thesis research with the Dublin City University.
          <br />
          It focuses on the Data Interoperability Panel specification, and evaluates whether users are able to express their access and
          privacy preferences.
        </p>

        <table class="table mr-3 ml-3" style="width: auto">
          <tr class="home row" style="background: rgba(0, 0, 0, 0.03)">
            <th class="col-6 text-success border" scope="col" style="text-align: center">What this project does</th>
            <th class="col-6 text-danger border" scope="col" style="text-align: center">What this project does not</th>
          </tr>
          <tr class="row">
            <td class="col-6 border-left border-right border-top-0 border-bottom-0" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong
                    >Provide a <span class="text-muted">partial</span> implementation for access request interface of the Data
                    Interoperability Panel specification</strong
                  >
                  <ul>
                    <li>Provide user with an interface to create and configure access and data authorizations for a given set of needs.</li>
                    <li>Read the access needs of a given application and present them in the interface.</li>
                    <li>Use the interface output to produce valid access/data authorizations.</li>
                  </ul>
                </li>
              </ul>
            </td>
            <td class="col-6 border-left border-right border-top-0 border-bottom-0" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong
                    >Provide a <span class="text-muted">complete</span> implementation of the Data Interoperability Panel
                    specification.</strong
                  >
                  <ul class="mb-3">
                    <li>Provision of access receipts.</li>
                    <li>Provision of access grants.</li>
                    <li>Registry creation and management.</li>
                    <li>Shape tree creation and registration.</li>
                    <li>Data instances creation and registration.</li>
                    <li>Delegated grants and access sharing.</li>
                  </ul>
                  This interface assumes that everything else is entirely functional.
                </li>
              </ul>
            </td>
          </tr>
          <tr class="row">
            <td class="col-6 border-left border-right border-top-0 border-bottom-0" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong>Supplement the original specification with the Data Privacy Vocabulary, to provide privacy context.</strong>
                  <ul>
                    <li>Type of data.</li>
                    <li>Purpose.</li>
                  </ul>
                </li>
              </ul>
            </td>
            <td class="col-6 border-left border-right border-top-0 border-bottom-0" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong>Provide a secure context for the authorization process.</strong>
                  <ul class="mb-2">
                    <li>Certify the identity of the application and its author.</li>
                    <li>
                      Guarantee that the access granted will not be used in another, undeclared form disrespecting the spirit of the
                      authorization.
                    </li>
                  </ul>
                  This interface assumes that Projectron and the authorization mechanism can be trusted to a reasonable extent, and that the
                  authorization flow will be enforced.
                </li>
              </ul>
            </td>
          </tr>
          <tr class="row">
            <td class="col-6 border-left border-right border-top-0 border-bottom" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong>Manipulate RDF (<em>Resource Description Framework</em>) data.</strong>
                  <ul>
                    <li>Data registries and content, access needs and authorizations are loaded from/to graph entities.</li>
                  </ul>
                </li>
              </ul>
            </td>
            <td class="col-6 border-left border-right border-top-0 border-bottom" style="margin-bottom: 3px; padding-bottom: 3px">
              <ul>
                <li>
                  <strong>Interact with an actual SOLID POD.</strong>
                  <br />
                  This interface exchanges turtle files with an <em>ad-hoc</em> server.
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./interface.component.ts"></script>
