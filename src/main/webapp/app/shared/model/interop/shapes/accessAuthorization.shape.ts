import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>

<AccessAuthorizationShape> {
  a [ interop:AccessAuthorization ] ,
  interop:grantedBy                         IRI  // shex:reference <AgentShape> ,
  interop:grantedWith                       IRI? // shex:reference <ApplicationShape> ,
  interop:grantedAt                         xsd:dateTime ,
  interop:grantee                           IRI  // shex:reference <AgentShape> ,
  interop:hasAccessNeedGroup                IRI+ // shex:reference <AccessNeedGroupShape> ,
  interop:hasDataAuthorization              IRI+ // shex:reference <DataAuthorizationShape> ,
  interop:replaces                          IRI? // shex:reference <AccessAuthorizationShape>
}
`;

export type AccessAuthorizationShape = {
  id: string; // the url of a node of this shape
  type: AccessAuthorizationShapeType.AccessAuthorization;
  grantedBy: string;
  grantedWith?: string;
  grantedAt: Date;
  grantee: string;
  hasAccessNeedGroup?: string | string[];
  hasDataAuthorization: string | string[];
  replaces?: string;
};

export type AccessAuthorizationShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessAuthorizationShapeType.AccessAuthorization;
  grantedBy: URL | NamedNode;
  grantedWith?: URL | NamedNode;
  grantedAt: Date | Literal;
  grantee: URL | NamedNode;
  hasAccessNeedGroup?: URL | NamedNode | (URL | NamedNode)[];
  hasDataAuthorization: URL | NamedNode | (URL | NamedNode)[];
  replaces?: URL | NamedNode;
};

export type AccessAuthorizationShapeUpdateArgs = Partial<AccessAuthorizationShapeCreateArgs>;

export enum AccessAuthorizationShapeType {
  AccessAuthorization = 'http://www.w3.org/ns/solid/interop#AccessAuthorization',
}

export enum AccessAuthorizationShapeContext {
  type = 'rdf:type',
  grantedBy = 'interop:grantedBy',
  grantedWith = 'interop:grantedWith',
  grantedAt = 'interop:grantedAt',
  grantee = 'interop:grantee',
  hasAccessNeedGroup = 'interop:hasAccessNeedGroup',
  hasDataAuthorization = 'interop:hasDataAuthorization',
  replaces = 'interop:replaces',
}

export const accessAuthorization = new Shape<AccessAuthorizationShape, AccessAuthorizationShapeCreateArgs>({
  id: 'http://example.com/AccessAuthorizationShape',
  shape: shex,
  context: AccessAuthorizationShapeContext,
  type: AccessAuthorizationShapeType,
});
