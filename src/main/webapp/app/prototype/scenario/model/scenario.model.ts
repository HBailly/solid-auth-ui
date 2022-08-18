import { ExperimentStage, ScenarioName } from '@/shared/model/context.model';

export class Scenario {
  name: ScenarioName;
  stage: ExperimentStage;
  label: string;
  description: string;
  tasks: Array<string>;

  constructor(name: ScenarioName, stage: ExperimentStage, label: string, description: string, tasks: Array<string>) {
    this.name = name;
    this.stage = stage;
    this.label = label;
    this.description = description;
    this.tasks = tasks;
  }
}
