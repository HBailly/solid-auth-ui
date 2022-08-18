import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

<AccessGrantShape> {
  a [ interop:AccessGrant ] ,
  interop:grantedBy                         IRI  // shex:reference <AgentShape> ,
  interop:grantedWith                       IRI? // shex:reference <ApplicationShape> ,
  interop:grantedAt                         xsd:dateTime ,
  interop:grantee                           IRI  // shex:reference <AgentShape> ,
  interop:hasAccessNeedGroup                IRI  // shex:reference <AccessNeedGroupShape> ,
  interop:hasDataGrant                      IRI+ // shex:reference <DataGrant> ,
}
`;

export type AccessGrantShape = {
  id: string; // the url of a node of this shape
  type: AccessGrantShapeType.AccessGrant;
  grantedBy: string;
  grantedWith?: string;
  grantedAt: Date;
  grantee: string;
  hasAccessNeedGroup: string;
  hasDataGrant: string | string[];
};

export type AccessGrantShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessGrantShapeType.AccessGrant;
  grantedBy: URL | NamedNode;
  grantedWith?: URL | NamedNode;
  grantedAt: Date | Literal;
  grantee: URL | NamedNode;
  hasAccessNeedGroup: URL | NamedNode;
  hasDataGrant: URL | NamedNode | (URL | NamedNode)[];
};

export type AccessGrantShapeUpdateArgs = Partial<AccessGrantShapeCreateArgs>;

export enum AccessGrantShapeType {
  AccessGrant = 'http://www.w3.org/ns/solid/interop#AccessGrant',
}

export enum AccessGrantShapeContext {
  type = 'rdf:type',
  grantedBy = 'interop:grantedBy',
  grantedWith = 'interop:grantedWith',
  grantedAt = 'interop:grantedAt',
  grantee = 'interop:grantee',
  hasAccessNeedGroup = 'interop:hasAccessNeedGroup',
  hasDataGrant = 'interop:hasDataGrant',
}

export const accessGrant = new Shape<AccessGrantShape, AccessGrantShapeCreateArgs>({
  id: 'http://example.com/AccessGrantShape',
  shape: shex,
  context: AccessGrantShapeContext,
  type: AccessGrantShapeType,
});
