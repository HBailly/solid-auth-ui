import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';
import { AccessScenarioType } from '@/shared/model/interop/enums/accessScenarioType.enum';
import { AuthenticatesAsType } from '@/shared/model/interop/enums/authenticatesAs.enum';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX shex: <http://www.w3.org/ns/shex>

<AccessNeedGroupShape> {
  a [ interop:AccessNeedGroup ] ,
  interop:accessNecessity                   [ interop:AccessRequired interop:AccessOptional ] ,
  interop:accessScenario                    [ interop:PersonalAccess interop:SharedAccess ]+ ,
  interop:authenticatesAs                   [ interop:SocialAgent interop:Application ] ,
  interop:hasAccessNeedGroupDescription     IRI+  // shex:reference <AccessNeedGroupDescriptionShape> ,
  interop:hasAccessNeed                     IRI+  // shex:reference <AccessNeedShape> ,
}
`;

export type AccessNeedGroupShape = {
  id: string; // the url of a node of this shape
  type: AccessNeedGroupShapeType.AccessNeedGroup;
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  accessScenario: AccessScenarioType.PersonalAccess | AccessScenarioType.SharedAccess;
  authenticatesAs: AuthenticatesAsType.SocialAgent | AuthenticatesAsType.Application;
  hasAccessNeedGroupDescription: string | string[];
  hasAccessNeed: string | string[];
};

export type AccessNeedGroupShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessNeedGroupShapeType.AccessNeedGroup;
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  accessScenario: AccessScenarioType.PersonalAccess | AccessScenarioType.SharedAccess;
  authenticatesAs: AuthenticatesAsType.SocialAgent | AuthenticatesAsType.Application;
  hasAccessNeedGroupDescription: URL | NamedNode | (URL | NamedNode)[];
  hasAccessNeed: URL | NamedNode | (URL | NamedNode)[];
};

export type AccessNeedGroupShapeUpdateArgs = Partial<AccessNeedGroupShapeCreateArgs>;

export enum AccessNeedGroupShapeType {
  AccessNeedGroup = 'http://www.w3.org/ns/solid/interop#AccessNeedGroup',
}

export enum AccessNeedGroupShapeContext {
  type = 'rdf:type',
  accessNecessity = 'interop:accessNecessity',
  accessScenario = 'interop:accessScenario',
  authenticatesAs = 'interop:authenticatesAs',
  hasAccessNeedGroupDescription = 'interop:hasAccessNeedGroupDescription',
  hasAccessNeed = 'interop:hasAccessNeed',
}

export const accessNeedGroup = new Shape<AccessNeedGroupShape, AccessNeedGroupShapeCreateArgs>({
  id: 'http://example.com/AccessNeedGroupShape',
  shape: shex,
  context: AccessNeedGroupShapeContext,
  type: AccessNeedGroupShapeType,
});
