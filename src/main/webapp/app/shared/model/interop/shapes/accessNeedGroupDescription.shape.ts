import { Shape } from 'shex-methods';
import { Literal, NamedNode } from 'rdflib';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

<AccessNeedGroupDescriptionShape> {
  a [ interop:AccessNeedGroupDescription ] ,
  interop:inAccessDescriptionSet            IRI  // shex:reference <AccessDescriptionSetShape> ,
  interop:hasAccessNeedGroup                IRI  // shex:reference <AccessNeedGroupShape> ,
  skos:prefLabel                            rdf:langString ,
  skos:definition                          rdf:langString
}
`;

export type AccessNeedGroupDescriptionShape = {
  id: string; // the url of a node of this shape
  type: AccessNeedGroupDescriptionShapeType.AccessNeedGroupDescription;
  inAccessDescriptionSet: string;
  hasAccessNeedGroup: string;
  prefLabel: string;
  description: string;
};

export type AccessNeedGroupDescriptionShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessNeedGroupDescriptionShapeType.AccessNeedGroupDescription;
  inAccessDescriptionSet: URL | NamedNode;
  hasAccessNeedGroup: URL | NamedNode;
  prefLabel: string | Literal;
  description: string | Literal;
};

export type AccessNeedGroupDescriptionShapeUpdateArgs = Partial<AccessNeedGroupDescriptionShapeCreateArgs>;

export enum AccessNeedGroupDescriptionShapeType {
  AccessNeedGroupDescription = 'http://www.w3.org/ns/solid/interop#AccessNeedGroupDescription',
}

export enum AccessNeedGroupDescriptionShapeContext {
  type = 'rdf:type',
  inAccessDescriptionSet = 'interop:inAccessDescriptionSet',
  hasAccessNeedGroup = 'interop:hasAccessNeedGroup',
  prefLabel = 'skos:prefLabel',
  description = 'skos:definition',
}

export const accessNeedGroupDescription = new Shape<AccessNeedGroupDescriptionShape, AccessNeedGroupDescriptionShapeCreateArgs>({
  id: 'http://example.com/AccessNeedGroupDescriptionShape',
  shape: shex,
  context: AccessNeedGroupDescriptionShapeContext,
  type: AccessNeedGroupDescriptionShapeType,
});
