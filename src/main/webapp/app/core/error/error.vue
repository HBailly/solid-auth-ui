<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <img
          alt="Error"
          class="mx-auto d-block img-fluid rounded"
          src="https://www.svgrepo.com/show/153502/tape.svg"
          style="max-width: 500px"
        />
      </div>
      <div class="col-md-9">
        <h1 v-if="error403">403 - Unauthorized!</h1>
        <h1 v-if="error404">404 - Page Not Found!</h1>

        <div v-if="errorMessage">
          <div class="alert alert-danger">{{ errorMessage }}</div>
        </div>
        <div v-if="error403" class="alert alert-danger">You are not authorized to access this page.</div>
        <div v-if="error404" class="alert alert-warning">The page you requested does not exist.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./error.component.ts"></script>
