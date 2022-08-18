<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded">About <strong>Projectron</strong></div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <p>
          <em style="color: #7c4dff">Projectron</em> is a fictitious app offering a simple project management solution, and is used by the
          Data Interoperability Panel to illustrate the SOLID application access request UI and permissions.
          <br />
          Using Projectron, one can create and manage personal and professional projects, create tasks and subtasks and make your contacts
          assignees.
        </p>

        <p>
          <img
            alt="Schema of Projectron project management requirements"
            class="mx-auto d-block"
            src="@/../content/images/projectron.svg"
          />
        </p>

        <p>
          Projectron is "actively developed" by <em>ACME Corp.</em>, an equally fictitious company with a good reputation on the market for
          qualitative software solutions and praised for being reasonably privacy mindful.
        </p>
        <p>This project will also use (and extend) Projectron to evaluate the effectiveness of the access request interface.</p>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./projectron.component.ts"></script>
