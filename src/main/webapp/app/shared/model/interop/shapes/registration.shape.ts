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

<RegistrationShape> {
    interop:grantee                         IRI  // shex:reference <AgentShape> ,
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ,
    interop:satisfiesAccessNeed             IRI? // shex:reference <AccessNeedShape> ,
    interop:accessMode                      [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]+ ,
    interop:creatorAccessMode               [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]*
}
`;

export type RegistrationShape = {
  id: string; // the url of a node of this shape
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
};

export type RegistrationShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
};

export type RegistrationShapeUpdateArgs = Partial<RegistrationShapeCreateArgs>;

export enum RegistrationShapeContext {
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
}

export const registration = new Shape<RegistrationShape, RegistrationShapeCreateArgs>({
  id: 'http://example.com/RegistrationShape',
  shape: shex,
  context: RegistrationShapeContext,
});
