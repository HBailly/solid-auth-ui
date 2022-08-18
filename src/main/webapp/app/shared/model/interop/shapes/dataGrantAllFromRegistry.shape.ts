import { Shape } from 'shex-methods';
import { NamedNode } from 'rdflib';
import { ScopeOfGrantType } from '@/shared/model/interop/enums/scopeOfGrant.enum';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

<DataGrantAllFromRegistryShape> {
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
  interop:scopeOfGrant                      [ interop:AllFromRegistry ]
}
`;
export type DataGrantAllFromRegistryShape = {
  id: string; // the url of a node of this shape
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  dataOwner: string;
  hasDataRegistration: string;
  scopeOfGrant: ScopeOfGrantType.AllFromRegistry;
} & ({
  id: string; // the url of a node of this shape
} & (
  | {
      type: DataGrantAllFromRegistryShapeType.DataGrant;
    }
  | {
      id: string; // the url of a node of this shape
      type: DataGrantAllFromRegistryShapeType.DelegatedDataGrant;
      delegationOfGrant: string;
    }
));

export type DataGrantAllFromRegistryShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  dataOwner: URL | NamedNode;
  hasDataRegistration: URL | NamedNode;
  scopeOfGrant: ScopeOfGrantType.AllFromRegistry;
} & ({
  id: string; // the url of a node of this shape
} & (
  | {
      type: DataGrantAllFromRegistryShapeType.DataGrant;
    }
  | {
      id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
      type: DataGrantAllFromRegistryShapeType.DelegatedDataGrant;
      delegationOfGrant: URL | NamedNode;
    }
));

export type DataGrantAllFromRegistryShapeUpdateArgs = Partial<DataGrantAllFromRegistryShapeCreateArgs>;

export enum DataGrantAllFromRegistryShapeType {
  DelegatedDataGrant = 'http://www.w3.org/ns/solid/interop#DelegatedDataGrant',
  DataGrant = 'http://www.w3.org/ns/solid/interop#DataGrant',
}

export enum DataGrantAllFromRegistryShapeContext {
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
}

export const dataGrantAllFromRegistry = new Shape<DataGrantAllFromRegistryShape, DataGrantAllFromRegistryShapeCreateArgs>({
  id: 'http://example.com/DataGrantAllFromRegistryShape',
  shape: shex,
  context: DataGrantAllFromRegistryShapeContext,
  type: DataGrantAllFromRegistryShapeType,
});
