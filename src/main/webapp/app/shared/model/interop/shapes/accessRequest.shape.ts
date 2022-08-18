import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX shex: <http://www.w3.org/ns/shex>

<AccessRequestShape> {
  a [interop:AccessRequest] ,
  interop:fromSocialAgent                   IRI  // shex:reference <SocialAgentShape> ,
  interop:toSocialAgent                     IRI  // shex:reference <SocialAgentShape> ,
  interop:hasAccessNeedGroup                IRI  // shex:reference <AccessNeedGroup>
}
`;

export type AccessRequestShape = {
  id: string; // the url of a node of this shape
  type: AccessRequestShapeType.AccessRequest;
  fromSocialAgent: string;
  toSocialAgent: string;
  hasAccessNeedGroup: string;
};

export type AccessRequestShapeCreateArgs = {
  id?: string | NamedNode;
  type: AccessRequestShapeType.AccessRequest;
  fromSocialAgent: URL | NamedNode;
  toSocialAgent: URL | NamedNode;
  hasAccessNeedGroup: URL | NamedNode;
};

export type AccessRequestShapeUpdateArgs = Partial<AccessRequestShapeCreateArgs>;

export enum AccessRequestShapeType {
  AccessRequest = 'http://www.w3.org/ns/solid/interop#AccessRequest',
}

export enum AccessRequestShapeContext {
  type = 'rdf:type',
  fromSocialAgent = 'interop:fromSocialAgent',
  toSocialAgent = 'interop:toSocialAgent',
  hasAccessNeedGroup = 'interop:hasAccessNeedGroup',
}

export const accessRequest = new Shape<AccessRequestShape, AccessRequestShapeCreateArgs>({
  id: 'http://example.com/AccessRequestShape',
  shape: shex,
  context: AccessRequestShapeContext,
  type: AccessRequestShapeType,
});
