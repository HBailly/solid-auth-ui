import { Shape } from 'shex-methods';
import { ScopeOfGrantType } from '@/shared/model/interop/enums/scopeOfGrant.enum';
import { NamedNode } from 'rdflib';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ldp: <http://www.w3.org/ns/ldp#>

<DataGrantInheritedShape> {
  ( a [ interop:DataGrant ]
    |
    a [ interop:DelegatedDataGrant ] ,
    interop:delegationOfGrant               IRI  // shex:reference <DataGrantShape> ) ,
    interop:grantee                         IRI  // shex:reference <AgentShape> ,
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ,
    interop:satisfiesAccessNeed             IRI? // shex:reference <AccessNeedShape> ,
    interop:accessMode                      [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]+ ,
    interop:creatorAccessMode               [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]* ,
  interop:dataOwner                         IRI  // shex:reference <AgentShape> ,
  interop:hasDataRegistration               IRI  // shex:reference <DataRegistrationShape> ,
  interop:scopeOfGrant                      [ interop:Inherited ] ,
  interop:inheritsFromGrant                 IRI  // shex:reference <DataGrantShape> ,
}
`;

export type DataGrantInheritedShape = {
  id: string; // the url of a node of this shape
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  dataOwner: string;
  hasDataRegistration: string;
  scopeOfGrant: ScopeOfGrantType.Inherited;
  inheritsFromGrant: string;
} & ({
  id: string; // the url of a node of this shape
} & (
  | {
      type: DataGrantInheritedShapeType.DataGrant;
    }
  | {
      id: string; // the url of a node of this shape
      type: DataGrantInheritedShapeType.DelegatedDataGrant;
      delegationOfGrant: string;
    }
));

export type DataGrantInheritedShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  dataOwner: URL | NamedNode;
  hasDataRegistration: URL | NamedNode;
  scopeOfGrant: ScopeOfGrantType.Inherited;
  inheritsFromGrant: URL | NamedNode;
} & ({
  id: string; // the url of a node of this shape
} & (
  | {
      type: DataGrantInheritedShapeType.DataGrant;
    }
  | {
      id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
      type: DataGrantInheritedShapeType.DelegatedDataGrant;
      delegationOfGrant: URL | NamedNode;
    }
));

export type DataGrantInheritedShapeUpdateArgs = Partial<DataGrantInheritedShapeCreateArgs>;

export enum DataGrantInheritedShapeType {
  DelegatedDataGrant = 'http://www.w3.org/ns/solid/interop#DelegatedDataGrant',
  DataGrant = 'http://www.w3.org/ns/solid/interop#DataGrant',
}

export enum DataGrantInheritedShapeContext {
  type = 'rdf:type',
  delegationOfGrant = 'interop:delegationOfGrant',
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  dataOwner = 'interop:dataOwner',
  hasDataRegistration = 'interop:hasDataRegistration',
  scopeOfGrant = 'interop:scopeOfGrant',
  inheritsFromGrant = 'interop:inheritsFromGrant',
}

export const dataGrantInherited = new Shape<DataGrantInheritedShape, DataGrantInheritedShapeCreateArgs>({
  id: 'http://example.com/DataGrantInheritedShape',
  shape: shex,
  context: DataGrantInheritedShapeContext,
  type: DataGrantInheritedShapeType,
});
