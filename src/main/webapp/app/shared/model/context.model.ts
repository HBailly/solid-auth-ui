import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { Application } from '@/shared/model/interop/wrappers/application.wrapper';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { WrapperStore } from '@/shared/model/wrapper.store';
import { Questionnaire, Section } from '@/questions/model/question.model';
import { Session } from '@/shared/model/session.model';

export class Context {
  /**
   * The current participant session ID.
   */
  session: Session = new Session();
  /**
   * The informed consent signed by the participant.
   */
  consent: Section;
  /**
   * The entities that have been loaded.
   */
  entities: WrapperStore = new WrapperStore();
  /**
   * The social agent receiving the access request.
   */
  agent: SocialAgent;
  /**
   * The application processing the access request.
   */
  authorizationAgent: Application;
  /**
   * The application producing the access request.
   */
  application: Application;
  /**
   * The access authorization being formed.
   */
  applicationByScenario: Map<ScenarioName, Application> = new Map();
  /**
   * The authorizations granted.
   */
  authorizationsByScenario: Map<ScenarioName, AccessAuthorization> = new Map();
  /**
   * The questionnaires administered
   */
  questionnaires: Map<string, Questionnaire> = new Map();
}

export enum ExperimentStage {
  PLS,
  CONSENT,
  PRELIMINARY,
  INTRODUCTION,
  GUIDELINES,
  SCENARIO1,
  SCENARIO2,
  SCENARIO3,
  SATISFACTION,
  DONE,
  TURTLE,
}

export enum ScenarioName {
  base,
  simple,
  extended,
  super_extended,
}
