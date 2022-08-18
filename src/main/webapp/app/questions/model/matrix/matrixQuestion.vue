<template>
  <table class="table table-sm">
    <caption style="caption-side: top; white-space: nowrap">
      {{
        matrix.label
      }}
    </caption>
    <tr v-for="question in matrix.questions" :key="question.index" class="row">
      <th class="pr-3 col-5" scope="row">
        {{ question.index }}. {{ question.text }}<em v-if="!question.optional" style="color: red">*</em>
      </th>
      <td class="col-7">
        <b-form-radio-group :checked="question.value" v-bind:required="!question.optional">
          <b-form-radio
            v-for="choice in matrix.choices"
            :key="choice.key"
            v-model="question.value"
            :value="choice.value"
            inline
            style="text-align: center"
            @change="setQ(question)"
            @input="setQ(question)"
          >
            {{ choice.text }}
          </b-form-radio>
          <b-form-radio
            v-if="matrix.other"
            v-model="question.value"
            inline
            value="other"
            @change="resetQ(question)"
            @input="resetQ(question)"
            >Other
            <b-form-input
              v-if="question.isOther"
              v-model="question.answer"
              :value="question.answer"
              inline
              placeholder="Type answer here"
              v-bind:required="!question.optional"
            />
          </b-form-radio>
        </b-form-radio-group>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" src="./matrixQuestion.component.ts"></script>
