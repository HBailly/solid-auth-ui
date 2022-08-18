<template>
  <div class="card mb-3">
    <div class="card-header" @click="expanded = !expanded"><strong>Tutorials</strong></div>
    <b-collapse v-model="expanded">
      <div class="card-body p-3">
        <p v-if="!standalone">Watch the following tutorial videos to know more about how to use the Access Request UI.</p>
        <b-carousel id="carousel-1" :interval="0" background="#ababab" controls indicators no-wrap style="text-shadow: 1px 1px 2px #333">
          <resource-component
            caption="What is an access Need & an Access Need Group?"
            url="https://www.youtube-nocookie.com/embed/EmHnmxGEefA"
          />
          <resource-component caption="How to determine the selection status?" url="https://www.youtube-nocookie.com/embed/pxsDPz-e4qQ" />
          <resource-component caption="How to use the checkboxes?" url="https://www.youtube-nocookie.com/embed/7klSpu7nsnI" />
          <resource-component
            caption="What are the properties of Access Needs and Access Need Groups?"
            url="https://www.youtube-nocookie.com/embed/7trrKbJo8Cw"
          />
          <resource-component caption="What are the Scopes of Authorizations?" url="https://www.youtube-nocookie.com/embed/RZH7XkpLOBg" />
        </b-carousel>
        <b-card class="text-muted" style="text-align: center">
          <font-awesome-icon icon="warning" />
          Please mind that the videos will not auto-stop when cycling through the carousel.
        </b-card>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./tutorials.component.ts"></script>
