<template>
  <div class="container-fluid" style="max-width: 1200px; margin-right: auto; margin-left: auto">
    <h3 v-if="standalone" class="display-7" style="margin-bottom: 35px">Contact</h3>
    <div>
      If you have any comments on the survey or the project, please feel free to contact us using one of the following means:
      <br />
      <ul>
        <li>
          <font-awesome-icon icon="envelope" />
          <a href="mailto:solid.access.request.ui.expr@gmail.com">solid.access.request.ui.expr@gmail.com</a>
        </li>
        <li>
          <font-awesome-icon icon="fa-brands fa-slack" />
          <a href="https://join.slack.com/t/solidauthui/shared_invite/zt-1cbzoa9ch-YfXeX3Wf2Eu0jwMGyG9Edg">Solid Auth UI Workspace</a>
        </li>
      </ul>
      You can also always get in touch directly with one of the investigators or the supervisor of this experiment.
    </div>
    <authors-component />
  </div>
</template>

<script lang="ts" src="./contact.component.ts"></script>
