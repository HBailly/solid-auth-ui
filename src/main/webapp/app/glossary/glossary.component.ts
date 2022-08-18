import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Entry } from '@/glossary/model/entry.model';

@Component
export default class GlossaryComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;

  expanded: boolean;

  entries: Array<Entry>;

  data() {
    const entries: Array<Entry> = [
      new Entry(
        'POD',
        'A Personal Online Datastore. Your POD is the location where you store your data online, and for which you manage access permissions.'
      ),
      new Entry(
        'Social Agent',
        'A Social Agent is a strongly identifiable individual, group, or organization that can own or be responsible for data, and provide authorization to the access of that data by other Agents.'
      ),
      new Entry(
        'Registry',
        'A Registry is a place where a Social Agent can store and find different types of data, often for particular purposes.'
      ),
      new Entry(
        'Application',
        'An Application is a software-based Agent that a Social Agent uses to access, manipulate, and manage the data in their control, as well as the data they’ve been granted access to.'
      ),
      new Entry(
        'Data Instance',
        'A Data Instance is a unique, stored instance of data in a Data Registration that conforms to its registered Shape Tree.'
      ),
      new Entry(
        'Data Registry',
        'A Data Registry is a collection of Data Registrations, each of which represents a unique type of data, identified by a shape tree.'
      ),
      new Entry(
        'Data Registration',
        'A Data Registration provides the Social Agent with a place to store Data Instances that conform to the registered shape tree of that registration. Data Registrations are stored in a Data Registry.'
      ),
      new Entry(
        'Access Need Group',
        'An Access Need Group is a collection of Access Needs used to communicate an access request to Social Agents.'
      ),
      new Entry(
        'Access Need',
        'An Access Need represents the requirement of one specific type of data represented by a shape tree, as part of an Access Need Group.'
      ),
      new Entry(
        'Access Authorization',
        'An Access Authorization records the decision of a Social Agent to grant access to some portion of data in their control to another Agent.'
      ),
      new Entry(
        'Data Authorization',
        'A Data Authorization records the decision of a Social Agent to grant access to a specific type of data in their control, identified by a Shape Tree. They are always associated with a single Access Authorization.'
      ),
      new Entry(
        'Scope of Authorization',
        'Each Data Authorization applies to a specific type of data, identified by a shape tree. The amount of access authorized for data of that type is specified by the Scope of Authorization.'
      ),
      new Entry('Scope of Access', 'See "<strong>Scope of Authorization</strong>".'),
      new Entry('Authorization Scope', 'See "<strong>Scope of Authorization</strong>".'),
      new Entry('Access Scope', 'See "<strong>Scope of Authorization</strong>".'),
      new Entry(
        'Scope of Authorization - All',
        'All of the owner’s data of a specified type, and all data shared with the owner of that type, across the owner’s registries.'
      ),
      new Entry(
        'Scope of Authorization - All from User',
        'All data of a given type shared by a specified Social Agent with the owner, across that Social Agent’s registries.'
      ),
      new Entry(
        'Scope of Authorization - All from Registry',
        'All of the data owner’s data of a specified type in a specified Data Registry.'
      ),
      new Entry(
        'Scope of Authorization - Selected from Registry',
        'Only specified Data Instances of the data owner’s of a given type in a specified Data Registry.'
      ),
      new Entry(
        'Scope of Authorization - Dependent',
        "Only Data Instances of the data owner's that are dependent from Data Instances allowed in the superseding need."
      ),
      new Entry(
        'Scope of Authorization - Inherited',
        'Only Data Instances of the data owner’s that are associated with Data Instances allowed by another authorization.'
      ),
      new Entry(
        'Access Mode',
        'An access mode denotes operations (e.g. read, write) that a given authorization subject can perform on an existing or future resource.'
      ),
      new Entry('Access Mode - Create', 'Create new Data Instances linked by shape tree reference.'),
      new Entry('Access Mode - Read', 'Read Data Instances linked by shape tree reference.'),
      new Entry('Access Mode - Update', 'Modify Data Instances linked by shape tree reference.'),
      new Entry(
        'Access Mode - Append',
        'Add new data to Data Instances linked by shape tree reference, without changing any existing data.'
      ),
      new Entry('Access Mode - Delete', 'Delete Data Instances linked by shape tree reference.'),
      new Entry(
        'Access Mode (Existing)',
        'An access mode denotes operations (e.g. read, write) that a given authorization subject can perform on an existing resource.'
      ),
      new Entry(
        'Access Mode (Creator)',
        'Additional access mode assigned to the creator of a data instance.\n' +
          'Only valid when existing access mode includes acl:Create, acl:Write, or acl:Append'
      ),
      new Entry('Access Necessity', 'Necessity of the access to the requesting party.'),
      new Entry('Access Necessity - Required', 'The access is mandatory and must be selected when granting the authorization.'),
      new Entry(
        'Access Necessity - Optional',
        'The access is not mandatory, and may be unselected (refused) when granting the authorization.'
      ),
      new Entry('Access Scenario', 'Context in which the access group should be presented.'),
      new Entry('Access Scenario - Personal Access', 'Access will only be used for the provision of service to the granting Social Agent.'),
      new Entry('Access Scenario - Shared Access', 'Access will be used for the provision of service with other Social Agents.'),
      new Entry('Authenticate as', 'Indicates whether access will be granted to a Social Agent or Application.'),
      new Entry('Registered ShapeTree', 'See "<strong>Type of Data</strong>".'),
      new Entry('Type of Data', 'Access Needs represent a request to access a particular type of data identified by shape tree type.'),
      new Entry(
        'Inherits from Need',
        'Link to another Access Need whose registeredShapeTree references the shape tree associated with the current Access Need, and from which the current needs inherits its access scope.'
      ),
      new Entry(
        'Inheritor Needs',
        'Links to the Access Needs whose scope of authorization depends from the current access need.(see "<strong>Inherits from Need</strong>"\')'
      ),
      new Entry(
        'Depend Needs',
        'Links to Access Needs whose requisition status is conditioned by the current need\'s status. (see "<strong>Depends from Need</strong>"\')'
      ),
      new Entry('Depends from Need', "Link to another Access Need whose selection status conditions the current need's requisition."),
      new Entry(
        'Purpose',
        'A purpose is a declaration of the use made of the data accessed. It conforms to the Data Privacy Vocabulary, a lexicon for GDPR legal purposes.'
      ),
    ];
    return {
      expanded: this.standalone,
      entries: entries.sort((a, b) => a.term.localeCompare(b.term)),
    };
  }
}
