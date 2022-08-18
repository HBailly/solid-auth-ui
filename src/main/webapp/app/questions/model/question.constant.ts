import { Choice, Choices } from '@/questions/model/question.model';

export const AGREEMENT_QUESTION = 'To what extent do you agree or disagree with each of the following statements?';

export const AGREEMENT_SCALE = Choices(['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']);
export const USEFULNESS_SCALE = Choices([
  'Not at all useful',
  'Slightly useful',
  'Moderately useful',
  'Very useful',
  'Extremely useful',
  'Not applicable',
]);
export const SATISFACTION_SCALE = Choices([
  'Very dissatisfied',
  'Somewhat dissatisfied',
  'Neutral',
  'Somewhat satisfied',
  'Very satisfied',
]);
export const EXPERIENCE_SCALE: Array<Choice> = Choices(['0-2 years', '3-5 years', '6-8 years', '9-11 years', '12+ years']);
export const CLARITY_SCALE = Choices(['Very confusing', 'Confusing', 'Neutral', 'Clear', 'Very clear']);
export const INFORMATION_SCALE = Choices([
  'Not at all informative',
  'Slightly informative',
  'Moderately informative',
  'Very informative',
  'Extremely informative',
  'Not applicable',
]);

export const YES_NO_MAYBE_NA = Choices(['Yes', 'No', 'Not sure', 'Not applicable']);
export const YES_NO = Choices(['Yes', 'No']);
export const YES_NO_BOOLEAN = [new Choice(true, 'Yes'), new Choice(false, 'No')];

export const SCALE_1_TO_10 = Choices(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
