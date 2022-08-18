export class Questionnaire {
  name: string;
  sectionsByName: Map<string, Section> = new Map();

  constructor(name: string) {
    this.name = name;
  }

  getCount(): number {
    return Array.from(this.sectionsByName.values())
      .map(section => section.questions)
      .map(question => question.length)
      .concat(0)
      .reduce((a, b) => a + b);
  }

  toJSON() {
    return {
      name: this.name,
      sectionsByName: Object.fromEntries(this.sectionsByName),
    };
  }
}

export class Section {
  name: string;
  questions: Array<Question> = [];

  constructor(name: string) {
    this.name = name;
  }
}

export interface Question {
  type: QuestionType;
  index: number;
  optional: boolean;
  text: string;
  answer: string;
}

export enum QuestionType {
  TEXT = 'text',
  RADIO = 'radio',
  MULTI = 'multi',
}

export class QArray {
  label: string;
  questions: Array<Question>;

  constructor(questions: Array<Question>, label?: string) {
    this.label = label;
    this.questions = questions;
    this.questions.forEach((v, k) => (v.index = k + 1));
  }

  static empty() {
    return new QArray([]);
  }
}

export class QMatrix {
  label: string;
  questions: Array<Question>;
  choices: Array<Choice>;
  other = false;

  constructor(label: string, questions: Array<Question>, choices: Array<Choice>, other?: boolean) {
    this.label = label;
    this.questions = questions;
    this.choices = choices;
    if (other != null) this.other = other;
    this.questions.forEach((v, k) => (v.index = k + 1));
  }

  static empty() {
    return new QMatrix('', [], []);
  }
}

export class TextQuestion implements Question {
  answer: string;
  index: number;
  optional = false;
  text: string;
  type = QuestionType.TEXT;

  constructor(text: string, optional?: boolean) {
    this.text = text;
    if (optional != null) this.optional = optional;
  }
}

export class MultilineQuestion implements Question {
  answer: string;
  index: number;
  optional = false;
  text: string;
  type = QuestionType.MULTI;

  constructor(text: string, optional?: boolean) {
    this.text = text;
    if (optional != null) this.optional = optional;
  }
}

export class RadioQuestion implements Question {
  answer: string;
  index: number;
  optional = false;
  text: string;
  type = QuestionType.RADIO;
  options: Array<Choice>;
  other = false;
  isOther = false;
  value: string;
  stacked = false;

  constructor(question: string, choices: Array<Choice>, optional?: boolean, other?: boolean, stacked?: boolean) {
    this.text = question;
    this.options = choices;
    if (optional != null) this.optional = optional;
    if (other != null) this.other = other;
    if (stacked != null) this.stacked = stacked;
    choices.forEach((v, k) => (v.key = k));
  }
}

export class Choice {
  key;
  text;
  value;

  constructor(value, text?) {
    this.value = value;
    this.text = text != null ? text : value;
  }
}

export function Choices(value: Array<string>): Array<Choice> {
  return value.map(v => new Choice(v));
}
