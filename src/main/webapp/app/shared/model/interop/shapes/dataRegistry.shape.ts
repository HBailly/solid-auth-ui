import { NamedNode } from 'rdflib';
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

<DataRegistryShape> {
  a [ interop:DataRegistry ] ,
  interop:hasDataRegistration               IRI* // shex:reference <DataRegistrationShape>
}
`;

export type DataRegistryShape = {
  id: string; // the url of a node of this shape
  type: DataRegistryShapeType.DataRegistry;
  hasDataRegistration?: string | string[];
};

export type DataRegistryShapeCreateArgs = {
  id?: string | NamedNode;
  type: DataRegistryShapeType.DataRegistry;
  hasDataRegistration?: URL | NamedNode | (URL | NamedNode)[];
};

export type DataRegistryShapeUpdateArgs = Partial<DataRegistryShapeCreateArgs>;

export enum DataRegistryShapeContext {
  type = 'rdf:type',
  hasDataRegistration = 'interop:hasDataRegistration',
}

export enum DataRegistryShapeType {
  DataRegistry = 'http://www.w3.org/ns/solid/interop#DataRegistry',
}

export const dataRegistry = new Shape<DataRegistryShape, DataRegistryShapeCreateArgs>({
  id: 'http://example.com/DataRegistryShape',
  shape: shex,
  context: DataRegistryShapeContext,
  type: DataRegistryShapeType,
});
