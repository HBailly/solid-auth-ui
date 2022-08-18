<template>
  <div class="card">
    <div class="card-header">
      <span class="font-weight-bolder">{{ person.getFullName() }}</span>
      <em v-if="person.title" class="font-italic"><br />{{ person.title }}</em>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span v-if="person.address.co">{{ person.address.co }}</span>
          <br v-if="person.address.co" />
          <span style="font-weight: bold">{{ person.address.name }}</span>
          <br />
          <span style="white-space: pre-wrap">{{ person.address.address }}</span>
        </li>
        <li class="list-group-item">
          <span>
            <span v-if="person.phone">Ph: {{ person.phone }}</span>
            <br />
            <span v-if="person.email"
              >E-mail: <a :href="'mailto:' + person.email">{{ person.email }}</a></span
            >
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" src="./person.component.ts"></script>
