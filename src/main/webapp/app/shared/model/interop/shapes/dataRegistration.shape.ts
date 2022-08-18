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

<DataRegistrationShape> {
  a [ interop:DataRegistration ] ,
    interop:registeredBy                    IRI // shex:reference <#AgentShape> ;
    interop:registeredWith                  IRI // shex:reference <#ApplicationShape> ;
    interop:registeredAt                    xsd:dateTime ;
    interop:updatedAt                       xsd:dateTime ;
  interop:registeredShapeTree               IRI  // shex:reference sts:ShapeTree ;
  ldp:contains                              IRI* ;
}
`;

export type DataRegistrationShape = {
  id: string; // the url of a node of this shape
  type: DataRegistrationShapeType.DataRegistration;
  registeredBy: string;
  registeredWith: string;
  registeredAt: Date;
  updatedAt: Date;
  registeredShapeTree: string;
  contains: string | string[];
};

export type DataRegistrationShapeCreateArgs = {
  id?: string | NamedNode;
  type: DataRegistrationShapeType.DataRegistration;
  registeredBy: URL | NamedNode;
  registeredWith: URL | NamedNode;
  registeredAt: Date | Literal;
  updatedAt: Date | Literal;
  registeredShapeTree: URL | NamedNode;
  contains: URL | NamedNode | (URL | NamedNode)[];
};

export type DataRegistrationShapeUpdateArgs = Partial<DataRegistrationShapeCreateArgs>;

export enum DataRegistrationShapeType {
  DataRegistration = 'http://www.w3.org/ns/solid/interop#DataRegistration',
}

export enum DataRegistrationShapeContext {
  type = 'rdf:type',
  registeredBy = 'interop:registeredBy',
  registeredWith = 'interop:registeredWith',
  registeredAt = 'interop:registeredAt',
  updatedAt = 'interop:updatedAt',
  registeredShapeTree = 'interop:registeredShapeTree',
  contains = 'ldp:contains',
}

export const dataRegistration = new Shape<DataRegistrationShape, DataRegistrationShapeCreateArgs>({
  id: 'http://example.com/DataRegistrationShape',
  shape: shex,
  context: DataRegistrationShapeContext,
  type: DataRegistrationShapeType,
});
