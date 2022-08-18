import { Scenario } from '@/prototype/scenario/model/scenario.model';
import { ExperimentStage, ScenarioName } from '@/shared/model/context.model';

export const scenario1 = new Scenario(
  ScenarioName.simple,
  ExperimentStage.SCENARIO1,
  'Version 1 - Standard Project Management Solution',
  'In this first version, you are simply tasked to grant the following permissions.',
  [
    '<strong>Projects</strong><br />You want to give access to all your <em>work</em> related projects.',
    '<strong>Tasks</strong><br />You want to give access to all the tasks that are shared with you by <em>one of your three subcontractors</em>. <span class="small">(Rourke CANDY, Larry KEEVES, Nariko POWDER</span>)',
    '<strong>Contacts</strong><br />You only want Projectron to access the three <em>work-related</em> contacts corresponding to your subcontractors.',
    '<strong>Credit Cards</strong><br />You want Projectron to access only your <em>work credit card</em>. <span class="small">[3746 2266 9991 3544]</span>',
    '<strong>Projectron Account</strong><br />You leave <em>full access</em> to Projectron to manage your account with them.',
  ]
);

export const scenario2 = new Scenario(
  ScenarioName.extended,
  ExperimentStage.SCENARIO2,
  'Version 2 - Project Management Solution with Dependency',
  'In this next version, you are presented with a more sophisticated request, which involves dependencies between access needs.' +
    '<br>' +
    '<br>' +
    '<strong>There are now two access needs for accessing your contacts: <em class="text-warning">Access to Project Managers</em> and <em class="text-warning">Access to Task Assignees</em> ;' +
    ' and they are organised in a hierarchic manner under "Access to Projects" and "Access to Tasks".</strong>' +
    '<br>' +
    '<br>' +
    'You still want to restrict the permissions as follows:',
  [
    '<strong>Projects</strong><br />You want to give access to all your <em>work</em> related projects.',
    '<strong>Tasks</strong><br />You want to give access to all the tasks that are shared with you by <em>one of your three subcontractors</em>. <span class="small">(Rourke CANDY, Larry KEEVES, Nariko POWDER</span>)',
    '<strong>Contacts</strong><br />You only want Projectron to access the three <em>work-related</em> contacts corresponding to your subcontractors.',
    '<strong>Credit Card</strong><br />You want Projectron to access only your <em>work credit card</em>. <span class="small">[3746 2266 9991 3544]</span>',
    '<strong>Projectron Account</strong><br />You leave <em>full access</em> to Projectron to manage your account with them.',
  ]
);

export const scenario3 = new Scenario(
  ScenarioName.super_extended,
  ExperimentStage.SCENARIO3,
  'Version 3 - Project Management Solution with Inheritance',
  'In this last access request, you are presented with an advanced request, which involves access inheritance between similar but independent access needs.' +
    '<br>' +
    '<br>' +
    '<strong>There is now a new access need group <em class="text-warning">Manage Your Team Members</em> with a single access need <em class="text-warning">Access to contacts</em>. ' +
    'The access needs <em class="text-muted">Access to Task Assignees</em> and <em class="text-muted">Access to Project Managers</em> now inherit their scope of authorization from this new access need "Access to Contacts".</strong>' +
    '<br>' +
    '<br>' +
    'You now want to restrict the permissions as follows:',
  [
    '<strong>Projects</strong><br />You want to give access to all your <em>work</em> related projects.',
    '<strong>Tasks</strong><br />You want to give access to all the tasks that are shared with you by <em>one of your three subcontractors</em>. <span class="small">(Rourke CANDY, Larry KEEVES, Nariko POWDER</span>)',
    '<strong>Contacts</strong><br />You only want Projectron to access the three <em>work-related</em> contacts corresponding to your subcontractors only for managing tasks.<br />You do not want to give access to your contact for assigning project managers.',
    '<strong>Credit Cards</strong><br />You want Projectron to access only your <em>work credit card</em>. <span class="small">[3746 2266 9991 3544]</span>',
    '<strong>Projectron Account</strong><br />You leave <em>full access</em> to Projectron to manage your account with them.',
  ]
);
