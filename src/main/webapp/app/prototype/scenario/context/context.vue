<template>
  <div class="card">
    <button id="Instructions-header" class="btn btn-light card-header" type="button" @click="shouldExpand = !shouldExpand">Context</button>
    <b-collapse v-model="shouldExpand">
      <div class="card-body">
        <p>
          You are <em style="color: #7c4dff">Alice</em>, a project manager in an event company, and you are in charge of coordinating its
          various subcontractors.
        </p>
        <p>
          To facilitate this coordination, you decide together to use <em style="color: #7c4dff">Projectron</em>, a decentralized,
          solid-based application. Projectron is a no-frills project management solution that enables you to create and follow-up projects
          and tasks, and provide assignees to each.
        </p>
        <p>
          In order to function, Projectron is <em style="color: #7c4dff">requesting access</em> to your Solid POD. More precisely, it
          requires
        </p>
        <ul>
          <li>
            <em>Access to projects, tasks and contact details</em> of your subcontractors, to be able to provide its core functionality.
          </li>
          <li>
            <em> Access to your credit card details and Projectron account</em>, to manage your subscription to their service and store your
            preferences.
          </li>
        </ul>
        <p>
          You are now presented with Projectron's access request, which produces the application requirements, and must decide whether you
          agree with the permissions requested, and to what extent. You <em style="color: #7c4dff">inspect the access request</em> to see if
          the permissions requested correspond to the request description, and you are happy to
          <em style="color: #7c4dff">grant these permissions</em>.
        </p>

        <table>
          <tr>
            <th colspan="2" scope="col">In your own POD, you currently have two registries: one work-related, and one personal.</th>
          </tr>
          <tr>
            <td class="pr-3">
              <ul style="margin-bottom: 1px">
                <li>Work Registry</li>
              </ul>
            </td>
            <td style="padding-bottom: 0; vertical-align: top"><a href="https://work.alice.example/data/">work.alice.example/data/</a></td>
          </tr>
          <tr>
            <td class="pr-3">
              <ul>
                <li>Personal Registry</li>
              </ul>
            </td>
            <td style="padding-bottom: 0; vertical-align: top">
              <a href="https://personal.alice.example/data/">personal.alice.example/data/</a>
            </td>
          </tr>
          <tr>
            <th colspan="2" scope="col">You have saved a number of private and professional entries in your registries.</th>
          </tr>
          <tr>
            <td colspan="2" style="padding-bottom: 16px">
              (They are stored in their respective registries, according to their private/professional qualities).
            </td>
          </tr>
          <tr>
            <th colspan="2" scope="col">You currently work with the following three subcontractors:</th>
          </tr>
          <tr>
            <td colspan="2">
              <ul>
                <li>Rourke CANDY</li>
                <li>Larry KEEVES</li>
                <li>Nariko POWDER</li>
              </ul>
            </td>
          </tr>
        </table>
        <p>You should of course restrict the permissions to those strictly necessary in order to interact with your subcontractors.</p>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./context.component.ts"></script>
