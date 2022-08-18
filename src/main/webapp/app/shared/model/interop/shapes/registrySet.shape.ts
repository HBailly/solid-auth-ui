import { Shape } from 'shex-methods';
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

<RegistrySetShape> {
  a [ interop:RegistrySet ] ,
  interop:hasAgentRegistry                  IRI  // shex:reference <AgentRegistryShape> ,
  interop:hasAuthorizationRegistry          IRI  // shex:reference <AuthorizationRegistryShape> ,
  interop:hasDataRegistry                   IRI* // shex:reference <DataRegistryShape>
}
`;

export type RegistrySetShape = {
  id: string;
  type: RegistrySetShapeType.RegistrySet;
  hasAgentRegistry: string;
  hasAuthorizationRegistry: string;
  hasDataRegistry?: string | string[];
};

export type RegistrySetShapeCreateArgs = {
  id?: string | NamedNode;
  type: RegistrySetShapeType.RegistrySet;
  hasAgentRegistry: URL | NamedNode;
  hasAuthorizationRegistry: URL | NamedNode;
  hasDataRegistry?: URL | NamedNode | (URL | NamedNode)[];
};

export type RegistrySetShapeUpdateArgs = Partial<RegistrySetShapeCreateArgs>;

export enum RegistrySetShapeType {
  RegistrySet = 'http://www.w3.org/ns/solid/interop#RegistrySet',
}

export enum RegistrySetShapeContext {
  type = 'rdf:type',
  hasAgentRegistry = 'interop:hasAgentRegistry',
  hasAuthorizationRegistry = 'interop:hasAuthorizationRegistry',
  hasDataRegistry = 'interop:hasDataRegistry',
}

export const registrySet = new Shape<RegistrySetShape, RegistrySetShapeCreateArgs>({
  id: 'http://example.com/RegistrySetShape',
  shape: shex,
  context: RegistrySetShapeContext,
  type: RegistrySetShapeType,
});
