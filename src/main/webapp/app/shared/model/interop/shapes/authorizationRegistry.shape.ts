import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX shex: <http://www.w3.org/ns/shex>

<AuthorizationRegistryShape> {
  a [ interop:AuthorizationRegistry ] ,
  interop:hasAccessAuthorization            IRI* // shex:reference <AccessAuthorizationShape>
}
`;

export type AuthorizationRegistryShape = {
  id: string; // the url of a node of this shape
  type: AuthorizationRegistryShapeType.AuthorizationRegistry;
  hasAccessAuthorization?: string | string[];
};

export type AuthorizationRegistryShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AuthorizationRegistryShapeType.AuthorizationRegistry;
  hasAccessAuthorization?: URL | NamedNode | (URL | NamedNode)[];
};

export type AuthorizationRegistryShapeUpdateArgs = Partial<AuthorizationRegistryShapeCreateArgs>;

export enum AuthorizationRegistryShapeType {
  AuthorizationRegistry = 'http://www.w3.org/ns/solid/interop#AuthorizationRegistry',
}

export enum AuthorizationRegistryShapeContext {
  type = 'rdf:type',
  hasAccessAuthorization = 'interop:hasAccessAuthorization',
}

export const authorizationRegistry = new Shape<AuthorizationRegistryShape, AuthorizationRegistryShapeCreateArgs>({
  id: 'http://example.com/AuthorizationRegistryShape',
  shape: shex,
  context: AuthorizationRegistryShapeContext,
  type: AuthorizationRegistryShapeType,
});
