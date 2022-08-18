<template>
  <span>
    <table class="table table-borderless table-sm">
      <tr>
        <td v-for="author in authors" :key="author.getFullName()">
          <person-component :person="author" />
        </td>
      </tr>
    </table>
  </span>
</template>

<script lang="ts" src="./authors.component.ts"></script>
