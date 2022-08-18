<template>
  <table class="table table-sm" style="table-layout: fixed; width: 100%">
    <caption v-if="array.label" style="caption-side: top; white-space: nowrap">
      {{
        array.label
      }}
    </caption>
    <tr v-for="question in array.questions" :key="question.index" class="row">
      <th v-if="question.type === QuestionType.MULTI" class="col-12" scope="row">
        {{ question.index }}. {{ question.text }}<em v-if="!question.optional" style="color: red">*</em>
      </th>
      <th v-else class="col-5" scope="row">
        {{ question.index }}. {{ question.text }}<em v-if="!question.optional" style="color: red">*</em>
      </th>
      <td v-if="question.type === QuestionType.TEXT" class="col-7">
        <b-form-input
          v-model="question.answer"
          :value="question.answer"
          placeholder="Type answer here"
          v-bind:required="!question.optional"
        />
      </td>
      <td v-else-if="question.type === QuestionType.RADIO" class="col-7">
        <b-form-radio-group :checked="question.value" v-bind:required="!question.optional" v-bind:stacked="question.stacked">
          <b-form-radio
            v-for="choice in question['options']"
            :key="question.index + '-' + choice.key"
            v-model="question.value"
            :value="choice.value"
            @change="set(question)"
          >
            {{ choice.text }}
          </b-form-radio>
          <b-form-radio v-if="question['other']" v-model="question.value" value="other" @change="reset(question)"
            >Other
            <b-form-input
              v-if="question.isOther"
              v-model="question.answer"
              :value="question.answer"
              placeholder="Type answer here"
              v-bind:required="!question.optional"
            />
          </b-form-radio>
        </b-form-radio-group>
      </td>
      <td v-else-if="question.type === QuestionType.MULTI" class="col-12">
        <b-form-textarea
          id="textarea"
          v-model="question.answer"
          :value="question.answer"
          max-rows="10"
          placeholder="Type answer here"
          rows="3"
          v-bind:required="!question.optional"
        />
      </td>
    </tr>
  </table>
</template>

<script lang="ts" src="./arrayQuestion.component.ts"></script>
