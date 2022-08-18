import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ldp: <http://www.w3.org/ns/ldp#>

<AccessNeedDescriptionShape> {
  a [ interop:AccessNeedDescription ] ,
  interop:inAccessDescriptionSet            IRI  // shex:reference <AccessDescriptionSetShape> ,
  interop:hasAccessNeed                     IRI  // shex:reference <AccessNeedShape> ,
  skos:prefLabel                            rdf:langString ,
  skos:definition                          rdf:langString
}
`;

export type AccessNeedDescriptionShape = {
  id: string; // the url of a node of this shape
  type: AccessNeedDescriptionShapeType.AccessNeedDescription;
  inAccessDescriptionSet: string;
  hasAccessNeed: string;
  prefLabel: string;
  description: string;
};

export type AccessNeedDescriptionShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessNeedDescriptionShapeType.AccessNeedDescription;
  inAccessDescriptionSet: URL | NamedNode;
  hasAccessNeed: URL | NamedNode;
  prefLabel: string | Literal;
  Description: string | Literal;
};

export type AccessNeedDescriptionShapeUpdateArgs = Partial<AccessNeedDescriptionShapeCreateArgs>;

export enum AccessNeedDescriptionShapeType {
  AccessNeedDescription = 'http://www.w3.org/ns/solid/interop#AccessNeedDescription',
}

export enum AccessNeedDescriptionShapeContext {
  type = 'rdf:type',
  inAccessDescriptionSet = 'interop:inAccessDescriptionSet',
  hasAccessNeed = 'interop:hasAccessNeed',
  prefLabel = 'skos:prefLabel',
  description = 'skos:definition',
}

export const accessNeedDescription = new Shape<AccessNeedDescriptionShape, AccessNeedDescriptionShapeCreateArgs>({
  id: 'http://example.com/AccessNeedDescriptionShape',
  shape: shex,
  context: AccessNeedDescriptionShapeContext,
  type: AccessNeedDescriptionShapeType,
});
