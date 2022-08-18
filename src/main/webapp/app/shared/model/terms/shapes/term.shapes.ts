import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX : <>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

<TermShape> {
  a IRI? ;
  rdfs:subClassOf IRI* ;
  rdfs:subPropertyOf IRI? ;
  ( rdfs:comment rdf:langString | rdfs:comment xsd:string )? ;
  ( rdfs:label rdf:langString | rdfs:label xsd:string )? ;
  dct:description rdf:langString? ;
  }
`;

export type TermShape = {
  id: string; // the url of a node of this shape
  type?: string;
  subClassOf?: string;
  subPropertyOf?: string;
  comment?: string;
  description?: string;
  label?: string;
};

export type TermShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: URL | NamedNode;
  subClassOf: URL | NamedNode;
  subPropertyOf: URL | NamedNode;
  comment?: string | Literal;
  description?: string | Literal;
  label?: string | Literal;
};

export type TermShapeUpdateArgs = Partial<TermShapeCreateArgs>;

export enum TermShapeContext {
  type = 'rdf:type',
  label = 'rdfs:label',
  comment = 'rdfs:comment',
  description = 'dct:description',
  subClassOf = 'rdfs:subClassOf',
  subPropertyOf = 'rdfs:subPropertyOf',
}

export const term = new Shape<TermShape, TermShapeCreateArgs>({
  id: 'http://example.com/TermShape',
  shape: shex,
  context: TermShapeContext,
});
